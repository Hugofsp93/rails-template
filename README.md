# Rails Template

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png" width="100" alt="Ruby Logo" style="margin-bottom: 30px;" />
  <h1>Rails Template + Inertia.js + React</h1>
  <p>Um template moderno para Ruby on Rails com React, Inertia.js, Vite e Tailwind CSS</p>
</div>

<!-- <p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#development">Development</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p> -->

<div align="center">

[![Ruby Version](https://img.shields.io/badge/Ruby-3.2.0-red)](https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/)
[![Rails Version](https://img.shields.io/badge/Rails-8.0.2-red)](https://rubygems.org/gems/rails/versions/8.0.2)
[![React Version](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Vite Version](https://img.shields.io/badge/Vite-5.4.18-yellow)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

## ✨ Features

- 🚀 **Full-stack Ruby on Rails** - Utilize todo o poder do Rails
- ⚡️ **Vite** - Build tool ultrarrápida para assets
- 🔥 **Hot Module Replacement** - Desenvolvimento em tempo real
- 🎨 **Tailwind CSS** - Estilização moderna e utilitária
- 🌙 **Tema Dark/Light** - Suporte a temas com Flowbite
- 🎭 **Variants** - Sistema de variantes de cores customizável
- 🔐 **Autenticação** - Sistema completo de auth com Devise
- 🎯 **Inertia.js** - Construa SPA sem APIs
- 📱 **Responsivo** - Layout adaptável para todos os dispositivos

## 🛠 Tech Stack

<div align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png" width="40" alt="Ruby" />
  <img src="https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png" width="48" alt="React" />
  <img src="https://raw.githubusercontent.com/innocenzi/awesome-inertiajs/main/assets/logo.svg" width="48" alt="Inertia.js" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png" width="48" alt="Vite" />
  <img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/31/tailwind.png" width="48" alt="Tailwind CSS" />
  <img src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png" width="48" alt="Flowbite" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/800px-Postgresql_elephant.svg.png" width="48" alt="PostgreSQL" />
</div>

## 🚀 Getting Started

### Pré-requisitos

- Ruby 3.2.0+
- Rails 8.0.0+
- Node.js 18+
- PostgreSQL 14+
- Yarn ou npm

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/rails-template.git
cd rails-template
```

2. Instale as dependências do Ruby
```bash
bundle install
```

3. Instale as dependências do Node
```bash
yarn install # ou npm install
```

4. Configure o banco de dados
```bash
rails db:create db:migrate
```

5. Inicie o servidor
```bash
bin/dev
```

Agora você pode acessar o projeto em `http://localhost:3100` 🎉

## 📦 Estrutura do Projeto

```
rails-template/
├── app/
│   ├── components/     # Componentes React reutilizáveis
│   ├── frontend/       # Código React/Inertia
│   │   ├── layouts/    # Layouts da aplicação
│   │   ├── pages/      # Páginas React
│   │   └── styles/     # Estilos Tailwind
│   └── views/          # Views do Rails
├── config/
│   └── routes.rb       # Rotas da aplicação
└── vite.config.ts      # Configuração do Vite
```

## 🎨 Customização

### Temas

O template suporta temas dark/light através do Flowbite. Para alternar:

```jsx
// Em qualquer componente React
import { useTheme } from '../hooks/useTheme'

const { theme, toggleTheme } = useTheme()
```

### Variants

Customize as cores do sistema editando:

```bash
rails "theme:generate[neutral,#FF0000]" # Gera variante primary
rails "theme:generate[utility,#00FF00]" # Gera variante secondary
```

<!-- ## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. -->

<!-- ## 🙏 Agradecimentos

- [Ruby on Rails](https://rubyonrails.org/)
- [Inertia.js](https://inertiajs.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/) -->

---

<p align="center">
  Feito com ❤️ por <a href="https://github.com/Hugofsp93">Hugofsp93</a>
</p>
