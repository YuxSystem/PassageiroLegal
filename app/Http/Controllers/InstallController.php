<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Enums\UserRoleEnum;

class InstallController extends Controller
{
    /**
     * Verifica se a aplicação já está instalada
     */
    public function check()
    {
        $installed = File::exists(storage_path('app/.installed'));
        
        return response()->json([
            'installed' => $installed,
            'has_env' => File::exists(base_path('.env')),
            'has_database' => $this->checkDatabase(),
        ]);
    }

    /**
     * Exibe a página de instalação
     */
    public function index()
    {
        // Se já está instalado, redirecionar
        if (File::exists(storage_path('app/.installed'))) {
            return redirect('/');
        }

        return inertia('Install/Index');
    }

    /**
     * Verifica os requisitos do sistema
     */
    public function checkRequirements()
    {
        $requirements = [
            'php_version' => [
                'name' => 'PHP >= 8.2',
                'status' => version_compare(PHP_VERSION, '8.2.0', '>='),
                'current' => PHP_VERSION,
            ],
            'pdo' => [
                'name' => 'Extensão PDO',
                'status' => extension_loaded('pdo'),
            ],
            'openssl' => [
                'name' => 'Extensão OpenSSL',
                'status' => extension_loaded('openssl'),
            ],
            'mbstring' => [
                'name' => 'Extensão Mbstring',
                'status' => extension_loaded('mbstring'),
            ],
            'tokenizer' => [
                'name' => 'Extensão Tokenizer',
                'status' => extension_loaded('tokenizer'),
            ],
            'xml' => [
                'name' => 'Extensão XML',
                'status' => extension_loaded('xml'),
            ],
            'ctype' => [
                'name' => 'Extensão Ctype',
                'status' => extension_loaded('ctype'),
            ],
            'json' => [
                'name' => 'Extensão JSON',
                'status' => extension_loaded('json'),
            ],
            'bcmath' => [
                'name' => 'Extensão BCMath',
                'status' => extension_loaded('bcmath'),
            ],
            'writable_storage' => [
                'name' => 'Diretório storage/ gravável',
                'status' => is_writable(storage_path()),
            ],
            'writable_bootstrap' => [
                'name' => 'Diretório bootstrap/cache/ gravável',
                'status' => is_writable(base_path('bootstrap/cache')),
            ],
        ];

        $allOk = collect($requirements)->every(fn($req) => $req['status']);

        return response()->json([
            'requirements' => $requirements,
            'all_ok' => $allOk,
        ]);
    }

    /**
     * Configura o arquivo .env
     */
    public function setupEnv(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string|max:255',
            'app_url' => 'required|url',
            'db_host' => 'required|string',
            'db_port' => 'required|integer',
            'db_database' => 'required|string',
            'db_username' => 'required|string',
            'db_password' => 'nullable|string',
        ]);

        try {
            $envPath = base_path('.env');
            $envExamplePath = base_path('.env.example');

            if (!File::exists($envPath)) {
                if (File::exists($envExamplePath)) {
                    File::copy($envExamplePath, $envPath);
                } else {
                    $this->createBasicEnv();
                }
            }

            // Atualizar valores do .env
            $envContent = File::get($envPath);
            
            $replacements = [
                'APP_NAME' => $request->app_name,
                'APP_URL' => $request->app_url,
                'DB_HOST' => $request->db_host,
                'DB_PORT' => $request->db_port,
                'DB_DATABASE' => $request->db_database,
                'DB_USERNAME' => $request->db_username,
                'DB_PASSWORD' => $request->db_password ?? '',
            ];

            foreach ($replacements as $key => $value) {
                $envContent = preg_replace(
                    "/^{$key}=.*/m",
                    "{$key}={$value}",
                    $envContent
                );
            }

            File::put($envPath, $envContent);

            return response()->json([
                'success' => true,
                'message' => 'Arquivo .env configurado com sucesso',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao configurar .env: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Testa a conexão com o banco de dados
     */
    public function testDatabase(Request $request)
    {
        $request->validate([
            'db_host' => 'required|string',
            'db_port' => 'required|integer',
            'db_database' => 'required|string',
            'db_username' => 'required|string',
            'db_password' => 'nullable|string',
        ]);

        try {
            config([
                'database.connections.mysql.host' => $request->db_host,
                'database.connections.mysql.port' => $request->db_port,
                'database.connections.mysql.database' => $request->db_database,
                'database.connections.mysql.username' => $request->db_username,
                'database.connections.mysql.password' => $request->db_password ?? '',
            ]);

            DB::connection('mysql')->getPdo();

            return response()->json([
                'success' => true,
                'message' => 'Conexão com o banco de dados estabelecida com sucesso',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Executa as migrations
     */
    public function runMigrations()
    {
        try {
            Artisan::call('migrate', ['--force' => true]);
            
            return response()->json([
                'success' => true,
                'message' => 'Migrations executadas com sucesso',
                'output' => Artisan::output(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao executar migrations: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cria o usuário administrador
     */
    public function createAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            // Verificar se já existe admin
            $existingAdmin = User::where('role', UserRoleEnum::Admin->value)->first();
            if ($existingAdmin) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuário administrador já existe',
                ], 400);
            }

            User::create([
                'id' => Str::uuid(),
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => UserRoleEnum::Admin->value,
                'status' => 'enabled',
                'email_verified_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Usuário administrador criado com sucesso',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar usuário administrador: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Finaliza a instalação
     */
    public function finish()
    {
        try {
            // Gerar chave da aplicação se não existir
            if (empty(config('app.key'))) {
                Artisan::call('key:generate', ['--force' => true]);
            }

            // Limpar cache
            Artisan::call('config:clear');
            Artisan::call('cache:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');

            // Criar arquivo de instalação completa
            File::put(storage_path('app/.installed'), date('Y-m-d H:i:s'));

            return response()->json([
                'success' => true,
                'message' => 'Instalação concluída com sucesso!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao finalizar instalação: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verifica se o banco de dados está configurado
     */
    private function checkDatabase(): bool
    {
        try {
            DB::connection()->getPdo();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Cria um arquivo .env básico
     */
    private function createBasicEnv(): void
    {
        $envContent = <<<'ENV'
APP_NAME="Passageiro Legal"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=America/Sao_Paulo
APP_URL=http://localhost

APP_LOCALE=pt_BR
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=pt_BR

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=passageiro_legal
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

EVOLUTION_API_URL=
EVOLUTION_API_KEY=
EVOLUTION_API_INSTANCE_NAME=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
ENV;

        File::put(base_path('.env'), $envContent);
    }
}

