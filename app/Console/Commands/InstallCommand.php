<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Enums\UserRoleEnum;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:install 
                            {--admin-name= : Nome do administrador}
                            {--admin-email= : Email do administrador}
                            {--admin-password= : Senha do administrador}
                            {--skip-env : Pular configuração do .env}
                            {--skip-migrations : Pular execução das migrations}
                            {--skip-seed : Pular criação do usuário admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Instala a aplicação Passageiro Legal';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Iniciando instalação do Passageiro Legal...');
        $this->newLine();

        // Verificar requisitos
        if (!$this->checkRequirements()) {
            return Command::FAILURE;
        }

        // Configurar .env
        if (!$this->option('skip-env')) {
            $this->info('📝 Configurando arquivo .env...');
            $this->setupEnv();
            $this->newLine();
        }

        // Gerar chave da aplicação
        $this->info('🔑 Gerando chave da aplicação...');
        Artisan::call('key:generate', ['--force' => true]);
        $this->info('✓ Chave gerada com sucesso');
        $this->newLine();

        // Executar migrations
        if (!$this->option('skip-migrations')) {
            $this->info('🗄️  Executando migrations...');
            try {
                Artisan::call('migrate', ['--force' => true]);
                $this->info('✓ Migrations executadas com sucesso');
            } catch (\Exception $e) {
                $this->error('✗ Erro ao executar migrations: ' . $e->getMessage());
                return Command::FAILURE;
            }
            $this->newLine();
        }

        // Criar usuário admin
        if (!$this->option('skip-seed')) {
            $this->info('👤 Criando usuário administrador...');
            $this->createAdminUser();
            $this->newLine();
        }

        // Limpar cache
        $this->info('🧹 Limpando cache...');
        Artisan::call('config:clear');
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        $this->info('✓ Cache limpo');
        $this->newLine();

        // Criar arquivo de instalação completa
        File::put(storage_path('app/.installed'), date('Y-m-d H:i:s'));

        $this->info('✅ Instalação concluída com sucesso!');
        $this->newLine();
        $this->info('📋 Próximos passos:');
        $this->line('   1. Configure as variáveis de ambiente no arquivo .env');
        $this->line('   2. Execute: npm install && npm run build');
        $this->line('   3. Acesse a aplicação e faça login com o usuário admin criado');
        $this->newLine();

        return Command::SUCCESS;
    }

    /**
     * Verifica os requisitos do sistema
     */
    private function checkRequirements(): bool
    {
        $this->info('🔍 Verificando requisitos do sistema...');

        $requirements = [
            'PHP >= 8.2' => version_compare(PHP_VERSION, '8.2.0', '>='),
            'Extensão PDO' => extension_loaded('pdo'),
            'Extensão OpenSSL' => extension_loaded('openssl'),
            'Extensão Mbstring' => extension_loaded('mbstring'),
            'Extensão Tokenizer' => extension_loaded('tokenizer'),
            'Extensão XML' => extension_loaded('xml'),
            'Extensão Ctype' => extension_loaded('ctype'),
            'Extensão JSON' => extension_loaded('json'),
            'Extensão BCMath' => extension_loaded('bcmath'),
        ];

        $allOk = true;
        foreach ($requirements as $requirement => $status) {
            if ($status) {
                $this->line("   ✓ {$requirement}");
            } else {
                $this->error("   ✗ {$requirement}");
                $allOk = false;
            }
        }

        if (!$allOk) {
            $this->newLine();
            $this->error('❌ Alguns requisitos não foram atendidos. Por favor, instale as extensões necessárias.');
        } else {
            $this->info('✓ Todos os requisitos foram atendidos');
        }

        $this->newLine();
        return $allOk;
    }

    /**
     * Configura o arquivo .env
     */
    private function setupEnv(): void
    {
        $envPath = base_path('.env');
        $envExamplePath = base_path('.env.example');

        if (!File::exists($envPath)) {
            if (File::exists($envExamplePath)) {
                File::copy($envExamplePath, $envPath);
                $this->info('✓ Arquivo .env criado a partir do .env.example');
            } else {
                // Criar .env básico
                $this->createBasicEnv();
                $this->info('✓ Arquivo .env criado');
            }
        } else {
            $this->warn('⚠ Arquivo .env já existe. Pulando configuração.');
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

    /**
     * Cria o usuário administrador
     */
    private function createAdminUser(): void
    {
        // Verificar se já existe admin
        $existingAdmin = User::where('role', UserRoleEnum::Admin->value)->first();
        if ($existingAdmin) {
            $this->warn('⚠ Usuário administrador já existe. Pulando criação.');
            return;
        }

        $name = $this->option('admin-name') ?: $this->ask('Nome do administrador', 'Administrador');
        $email = $this->option('admin-email') ?: $this->ask('Email do administrador', 'admin@passageirolegal.com.br');
        $password = $this->option('admin-password') ?: $this->secret('Senha do administrador (mínimo 8 caracteres)');

        // Validar senha
        if (strlen($password) < 8) {
            $this->error('✗ A senha deve ter no mínimo 8 caracteres');
            return;
        }

        // Validar email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('✗ Email inválido');
            return;
        }

        // Verificar se email já existe
        if (User::where('email', $email)->exists()) {
            $this->error('✗ Este email já está em uso');
            return;
        }

        try {
            User::create([
                'id' => Str::uuid(),
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => UserRoleEnum::Admin->value,
                'status' => 'enabled',
                'email_verified_at' => now(),
            ]);

            $this->info("✓ Usuário administrador criado com sucesso!");
            $this->line("   Email: {$email}");
            $this->line("   Senha: [oculta]");
        } catch (\Exception $e) {
            $this->error('✗ Erro ao criar usuário administrador: ' . $e->getMessage());
        }
    }
}

