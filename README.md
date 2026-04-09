# Sistema de Gestão de Academia

**Aluno:** Gabriel Zem Muraro

CRUD de academia

## Tecnologias Utilizadas

- **Frontend:** React 18 + Tailwind CSS + Axios + React Router DOM
- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL

## Como Rodar o Projeto

### 1. Banco de Dados

1. Abra o MySQL Workbench ou outro cliente MySQL.
2. Importe o arquivo `database.sql` que está na raiz do projeto.
   - No Workbench: **Server > Data Import > Import from Self-Contained File**.
   - Ou execute: `mysql -u root -p < database.sql`
3. Isso criará o banco `academia_db` com a tabela `alunos` e 10 registros de exemplo.

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

O servidor inicia em **http://localhost:3001**.

> **Nota:** Edite o arquivo `backend/src/config/db.js` e altere o campo `password` para a senha do seu MySQL.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação abre em **http://localhost:3000**.

## Estrutura do Projeto

```
academia-pbjl/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Conexão com o MySQL
│   │   ├── controllers/
│   │   │   └── alunoController.js    # Lógica das rotas (CRUD)
│   │   ├── middlewares/
│   │   │   └── validations.js        # Validações de entrada
│   │   ├── routes/
│   │   │   └── alunoRoutes.js        # Definição das rotas da API
│   │   └── server.js                 # Ponto de entrada do backend
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlunoForm.js          # Formulário reutilizável
│   │   │   ├── ConfirmModal.js       # Modal de confirmação
│   │   │   └── Layout.js             # Layout principal
│   │   ├── pages/
│   │   │   ├── CadastroAluno.js      # Página de cadastro
│   │   │   ├── DetalhesAluno.js      # Página de detalhes
│   │   │   ├── EditarAluno.js        # Página de edição
│   │   │   └── ListaAlunos.js        # Página principal (listagem)
│   │   ├── services/
│   │   │   └── api.js                # Configuração do Axios
│   │   ├── App.js                    # Rotas do React
│   │   ├── index.css                 # Estilos globais (Tailwind)
│   │   └── index.js                  # Ponto de entrada do frontend
│   └── package.json
├── database.sql                      # Script de criação do banco
└── README.md
```

## Funcionalidades

- Listagem de alunos com paginação e busca por nome, e-mail ou CPF
- Cadastro de novos alunos com validação e máscaras (CPF e telefone)
- Edição de dados do aluno
- Visualização detalhada de um aluno
- Exclusão com modal de confirmação
- Validações no frontend e no backend
- Tratamento de erros com mensagens amigáveis

## Endpoints da API

| Método | Rota              | Descrição                  |
|--------|-------------------|----------------------------|
| GET    | /api/alunos       | Listar alunos (paginado)   |
| GET    | /api/alunos/:id   | Buscar aluno por ID        |
| POST   | /api/alunos       | Cadastrar novo aluno       |
| PUT    | /api/alunos/:id   | Atualizar aluno existente  |
| DELETE | /api/alunos/:id   | Remover aluno              |

## Campos da Tabela alunos

| Campo            | Tipo         | Descrição                            |
|------------------|--------------|--------------------------------------|
| id               | INT (PK)     | Identificador único (auto)           |
| nome             | VARCHAR(150) | Nome completo do aluno               |
| email            | VARCHAR(150) | E-mail (único)                       |
| cpf              | VARCHAR(14)  | CPF formatado (único)                |
| data_nascimento  | DATE         | Data de nascimento                   |
| telefone         | VARCHAR(20)  | Telefone de contato                  |
| genero           | ENUM         | Masculino, Feminino ou Outro         |
| plano            | ENUM         | Mensal, Trimestral, Semestral, Anual |
| data_matricula   | DATE         | Data de matrícula na academia        |
| ativo            | TINYINT(1)   | Status (1 = ativo, 0 = inativo)     |
| criado_em        | TIMESTAMP    | Data de criação do registro (auto)   |
| atualizado_em    | TIMESTAMP    | Data da última atualização (auto)    |
