# 🛫 Passageiro Legal

Plataforma web para resolução de problemas com voos aéreos no Brasil, baseada na **Resolução nº 400 da ANAC**. A aplicação facilita o processo de registro de reclamações, gerenciamento de documentos e acompanhamento de status através de um sistema hierárquico de equipe interna.

## 📋 Sobre o Projeto

O **Passageiro Legal** foi desenvolvido para auxiliar passageiros aéreos a solicitarem indenizações e reivindicações quando ocorrem problemas com voos. A plataforma informa os passageiros sobre seus direitos garantidos pela Resolução ANAC 400 e oferece um processo simplificado para registro de reclamações.

### Tipos de Problemas Suportados

- ✈️ Atrasos de voos
- ❌ Cancelamentos
- 👥 Overbooking
- 🧳 Bagagem extraviada ou danificada

## 🎯 Funcionalidades

### Para Passageiros

- 📝 Registro de reclamações através de formulário multi-step
- 📄 Upload de documentos necessários (registro de nascimento, comprovante de residência, comprovante de voo)
- 👀 Acompanhamento do status das solicitações
- 📚 Informações sobre direitos do passageiro (Resolução ANAC 400)
- 🔐 Autenticação segura com 2FA

### Para a Equipe Interna

#### Agentes (Nível Básico)
- Visualização de processos atribuídos
- Análise de documentação
- Execução de tarefas operacionais
- Atualização de status dos processos

#### Supervisores (Nível Intermediário)
- Visualização de todos os processos
- Atribuição de processos aos agentes
- Validação e aprovação de trabalhos
- Supervisão da equipe

#### Administradores (Nível Total)
- Controle total do sistema
- Gerenciamento de usuários e permissões
- Acesso a estatísticas completas
- Tomada de decisões estratégicas

## 🛠️ Stack Tecnológico

### Backend
- **Laravel 11.31+** - Framework PHP
- **Laravel Fortify** - Autenticação
- **Laravel Jetstream** - Profile management e 2FA
- **Laravel Sanctum** - API tokens
- **PHP 8.2+** - Linguagem

### Frontend
- **React 18.3.1+** - Biblioteca UI
- **TypeScript 5.5.3+** - Type safety
- **Inertia.js 2.0+** - Integração Laravel/React
- **Tailwind CSS 3.4+** - Estilização
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários

### Ferramentas
- **Vite 5.4+** - Build tool
- **Ziggy** - Rotas Laravel no frontend

## 📦 Requisitos

- PHP 8.2 ou superior
- Composer
- Node.js 18+ e npm
- Banco de dados (SQLite para desenvolvimento, MySQL/PostgreSQL para produção)

## 🚀 Instalação

> **💡 Instalando no XAMPP?** Veja o guia completo em [INSTALACAO_XAMPP.md](INSTALACAO_XAMPP.md)

### Método 1: Instalador Web (Recomendado)

O Passageiro Legal possui um instalador web interativo que facilita a configuração inicial.

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/passageiro-legal.git
cd passageiro-legal
```

2. **Instale as dependências**
```bash
composer install
npm install
```

3. **Compile os assets do frontend**
```bash
npm run build
```

4. **Configure o servidor web**
   - Configure seu servidor web (Apache/Nginx) para apontar para o diretório `public/`
   - Ou use o servidor de desenvolvimento do Laravel:
   ```bash
   php artisan serve
   ```

5. **Acesse o instalador**
   - Abra seu navegador e acesse: `http://localhost:8000/install`
   - O instalador irá guiá-lo através dos seguintes passos:
     - ✅ Verificação de requisitos do sistema
     - ⚙️ Configuração do arquivo `.env`
     - 🗄️ Teste de conexão com banco de dados
     - 📊 Execução automática das migrations
     - 👤 Criação do usuário administrador
     - ✨ Finalização da instalação

6. **Pronto!**
   - Após a instalação, você será redirecionado para a página de login
   - Use as credenciais do administrador criadas durante a instalação

### Método 2: Instalação via Linha de Comando

Para instalação rápida via terminal:

1. **Clone e instale dependências**
```bash
git clone https://github.com/seu-usuario/passageiro-legal.git
cd passageiro-legal
composer install
npm install
npm run build
```

2. **Execute o comando de instalação**
```bash
php artisan app:install
```

O comando irá:
- Verificar requisitos do sistema
- Criar arquivo `.env` se não existir
- Gerar chave da aplicação
- Executar migrations
- Criar usuário administrador (solicitará informações)

**Opções do comando:**
```bash
# Com opções personalizadas
php artisan app:install \
  --admin-name="Seu Nome" \
  --admin-email="admin@exemplo.com" \
  --admin-password="senha123"

# Pular etapas específicas
php artisan app:install --skip-env --skip-migrations
```

### Método 3: Instalação Manual

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/passageiro-legal.git
cd passageiro-legal
```

2. **Instale as dependências**
```bash
composer install
npm install
```

3. **Configure o ambiente**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure o banco de dados no `.env`**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=passageiro_legal
DB_USERNAME=root
DB_PASSWORD=
```

5. **Execute as migrations**
```bash
php artisan migrate
```

6. **Crie um usuário administrador**
```bash
php artisan tinker
```
```php
User::create([
    'id' => \Illuminate\Support\Str::uuid(),
    'name' => 'Administrador',
    'email' => 'admin@passageirolegal.com.br',
    'password' => \Illuminate\Support\Facades\Hash::make('senha123'),
    'role' => \App\Enums\UserRoleEnum::Admin->value,
    'status' => 'enabled',
    'email_verified_at' => now(),
]);
```

7. **Compile os assets**
```bash
npm run build
# ou para desenvolvimento
npm run dev
```

8. **Inicie o servidor**
```bash
php artisan serve
```

A aplicação estará disponível em `http://localhost:8000`

### ⚠️ Notas Importantes

- **Permissões**: Certifique-se de que os diretórios `storage/` e `bootstrap/cache/` tenham permissões de escrita
- **Banco de Dados**: Crie o banco de dados antes de executar a instalação
- **Node.js**: Certifique-se de ter Node.js 18+ instalado para compilar os assets
- **PHP**: Requer PHP 8.2 ou superior com extensões necessárias (PDO, OpenSSL, Mbstring, etc.)

## 🏗️ Estrutura do Projeto

```
passageiro-legal/
├── app/
│   ├── Enums/              # Enums PHP
│   ├── Http/
│   │   ├── Controllers/    # Controllers
│   │   ├── Middleware/     # Middleware customizado
│   │   └── Requests/       # Request validation
│   ├── Models/             # Eloquent models
│   ├── Repositories/       # Repository pattern
│   ├── Services/           # Service layer
│   └── Providers/          # Service providers
├── resources/
│   ├── js/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas Inertia
│   │   ├── models/         # TypeScript models
│   │   └── utils/          # Utilitários
│   └── views/              # Templates Blade
├── routes/
│   ├── web.php             # Rotas web
│   └── auth.php            # Rotas de autenticação
└── database/
    ├── migrations/          # Database migrations
    └── seeders/            # Database seeders
```

## 📚 Base Legal

A plataforma está fundamentada na **Resolução nº 400 da ANAC** (Agência Nacional de Aviação Civil), que estabelece os direitos dos passageiros aéreos no Brasil em casos de problemas com voos.

## 🔐 Sistema de Autenticação

O projeto utiliza um sistema hierárquico de roles:

- **User** - Passageiros que registram reclamações
- **Employee** - Agentes que processam solicitações
- **Admin** - Administradores com controle total

## 🧪 Testes

Execute os testes com:
```bash
php artisan test
```

## 📝 Scripts Disponíveis

### Composer
```bash
composer dev              # Inicia servidor, queue, logs e Vite simultaneamente
php artisan app:install  # Instalador via linha de comando
```

### NPM
```bash
npm run dev   # Modo desenvolvimento com hot reload
npm run build # Build de produção
```

### Artisan
```bash
php artisan app:install              # Instalador completo
php artisan app:install --skip-env  # Pular configuração do .env
php artisan migrate                  # Executar migrations
php artisan db:seed                  # Executar seeders
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Desenvolvimento

- **Reutilize arquivos existentes** sempre que possível
- **Melhore o código existente** antes de criar novos arquivos
- Mantenha o código **organizado, limpo e reutilizável**
- Evite fragmentar a estrutura do projeto

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Equipe Passageiro Legal**

## 🙏 Agradecimentos

- Laravel Framework
- Comunidade React
- ANAC pela Resolução 400

---

**Desenvolvido com ❤️ para ajudar passageiros aéreos no Brasil**
