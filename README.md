# NEXUS

Arquivo: https://docs.google.com/document/d/1NAaemBgOyIiWUH7luwcLQ_JInW6IVIwbHvuSsycqY6k/edit?usp=sharing
Trello: https://trello.com/invite/b/689136b67a0236c16d91085e/ATTIe3b64fa824a12cf63e826b4711e5dc14F222C944/nexus-nodejs-react-ts

## Gerenciador de Finanças Pessoais

# Estrutura do Projeto (início):

NEXUS/
│
├── backend/                   # Backend da aplicação (Node.js/Express)
│   ├── node_modules/
│   └── src/
│       ├── config/            # Arquivos de configuração (ex: conexão com banco)
│       ├── controllers/       # Lógica dos controllers das rotas
│       ├── models/            # Modelos de dados (ORM ou schemas)
│       ├── routes/            # Definição das rotas da API
│       └── index.js           # Arquivo principal do servidor
│
├── frontend/                  # Frontend da aplicação (React + Vite)
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── assets/            # Imagens e outros recursos estáticos
│       ├── App.tsx           # Componente principal da aplicação
│       ├── App.css           # Estilos globais
│       ├── index.css         # Estilos principais
│       ├── main.tsx          # Ponto de entrada do React
│       └── vite-env.d.ts     # Tipagens do Vite
│
├── .gitignore
├── index.html
├── package.json              # Dependências do projeto
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js       # Configuração do Tailwind CSS
├── tsconfig.app.json        # Configuração TS para o frontend
├── tsconfig.json            # Configuração TS geral
├── tsconfig.node.json       # Configuração TS para o backend
├── vite.config.ts           # Configuração do Vite
├── eslint.config.js         # Configuração do ESLint
├── README.md
