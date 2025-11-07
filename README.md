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

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/passageiro-legal.git
cd passageiro-legal
```

2. **Instale as dependências do backend**
```bash
composer install
```

3. **Instale as dependências do frontend**
```bash
npm install
```

4. **Configure o ambiente**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configure o banco de dados no `.env`**
```env
DB_CONNECTION=sqlite
# ou
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=passageiro_legal
DB_USERNAME=root
DB_PASSWORD=
```

6. **Execute as migrations**
```bash
php artisan migrate
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
composer dev  # Inicia servidor, queue, logs e Vite simultaneamente
```

### NPM
```bash
npm run dev   # Modo desenvolvimento com hot reload
npm run build # Build de produção
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
