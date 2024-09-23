# Contact CRUD



https://github.com/user-attachments/assets/d61e038a-9c3c-4a8b-bc55-d9816335d328



## Visão Geral

O Contact CRUD é uma aplicação full-stack projetada para gerenciar contatos de usuários de forma eficiente. O projeto é dividido em duas partes principais: o cliente e o servidor. O cliente é construído com React e Tailwind CSS, enquanto o servidor utiliza Fastify e Prisma com PostgreSQL para gerenciamento de dados. Este README fornece uma visão geral de ambas as partes da aplicação.

## Cliente

### Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **Tailwind CSS**: Um framework CSS utilitário para estilização.
- **ShadCN UI**: Uma coleção de componentes construídos com Tailwind.
- **Radix UI**: Componentes de UI acessíveis e personalizáveis.
- **React Router DOM**: Para roteamento e navegação dentro da aplicação.
- **Zod**: Para validação de esquema.
- **React Hook Form**: Para gerenciar o estado e a validação de formulários.
- **React Query**: Para busca de dados e gerenciamento de estado.

### Telas

O cliente apresenta três telas principais:

1. **Login**
2. **Cadastro**
3. **Home**

#### Telas de Autenticação

As telas de Login e Cadastro incluem:

- **Validação de Formulário**: Gerenciada usando Zod e React Hook Form, garantindo que a entrada do usuário atenda aos critérios de validação.
- **Componentes de Entrada**: Componentes personalizados que incorporam máscara de entrada para CPF usando `use-mask-input`.
- **Notificações Toast**: Exibição de mensagens de erro disparadas pelo servidor, como "CPF inválido" ou "CPF já está em uso."
- **Redirecionamento**: Após a autenticação bem-sucedida, o token é armazenado e o usuário é redirecionado para a tela Home.

#### Middleware

Um middleware verifica a presença de um token no armazenamento local. Se nenhum token for encontrado, os usuários são negados o acesso à tela Home.

#### Tela Home

Na tela Home, os usuários podem:

- **Visualizar Lista de Contatos**: Se não houver contatos presentes, uma mensagem solicita que o usuário adicione um novo contato.
- **Adicionar Novo Contato**: Um botão abre um modal para inserir dados de contato (CPF, nome, email, telefone e foto opcional). A mesma lógica de validação é aplicada aqui, como nas telas de autenticação.
  - Em caso de sucesso, uma notificação toast confirma a adição; se falhar, uma mensagem de erro é exibida.
- **Editar Contato**: Os usuários podem editar contatos existentes, incluindo a possibilidade de adicionar ou remover uma foto de contato.
- **Excluir Contato**: Contatos podem ser excluídos, com mensagens de sucesso/erro apropriadas exibidas.
- **Funcionalidade de Busca**: Os usuários podem buscar contatos pelo nome, com resultados exibidos dinamicamente. O termo de busca é codificado na URL usando parâmetros de busca, e um efeito de debounce é utilizado para otimizar as consultas.

### Busca de Dados

A aplicação utiliza React Query para buscar dados de contato, garantindo gerenciamento eficiente de estado e cache para melhorar o desempenho.

---

## Servidor

### Tecnologias Utilizadas

- **Fastify**: Um framework web rápido e de baixo overhead para Node.js.
- **Prisma**: Um ORM para Node.js e TypeScript que simplifica o acesso ao banco de dados.
- **PostgreSQL**: Um poderoso sistema de banco de dados relacional de código aberto.
- **JWT**: Tokens JSON Web para autenticação segura.
- **Zod**: Para validação com segurança de tipo.
- **Swagger**: Ferramenta de documentação da API.

### Estrutura do Projeto

A pasta do servidor inclui os seguintes componentes principais:

- **Modelos de Banco de Dados**: Definidos usando Prisma com um datasource PostgreSQL.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String    @id @default(uuid())
  cpf      String
  name     String?
  email    String?
  password String
  contacts Contact[]
}

model Contact {
  id       String  @id @default(uuid())
  cpf      String
  email    String
  photoUrl String? @map("photo-url")
  phone    String
  name     String
  user     User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId   String?
}
```

### Rotas da API

As seguintes rotas gerenciam a autenticação de usuários e as informações de contato:

- **Autenticação de Usuário**
  - `signInRestController`: Gerencia o login do usuário e a emissão de JWT.
  - `signUpRestController`: Gerencia o registro de usuários e a criação de contas.

- **Gerenciamento de Contatos**
  - `createContactRestController`: Permite a criação de um novo contato.
  - `deleteContactRestController`: Gerencia a exclusão de um contato.
  - `updateContactRestController`: Atualiza os detalhes de um contato.
  - `listContactsRestController`: Recupera uma lista de contatos para o usuário autenticado.
  - `editContactPhotoRestController`: Atualiza a foto de um contato.
  - `deleteContactImageRestController`: Exclui a foto de um contato.

### Middleware e Validação JWT

A validação JWT é aplicada para proteger as rotas, garantindo que apenas usuários autenticados possam acessar ou modificar dados de contato.

### Manipulação de Upload de Arquivos

O servidor utiliza o suporte multipart do Fastify para gerenciar dados de formulário, permitindo que os usuários façam upload de imagens e outros arquivos associados aos contatos.

### Documentação da API

O Swagger é integrado para documentar a API, facilitando a compreensão e o uso dos endpoints pelos desenvolvedores.

diponível em  [localhost](http://localhost:3000/docs)

![image](https://github.com/user-attachments/assets/a6b5d6d0-b2db-4684-9cbd-6e0de03d5ba4)

---

## Como Começar

0. clone o repositório

   ```bash
     git clone https://github.com/joaoSouza-js/contacts-crud/
   ```

   você terà dois pojetos client(front-end) sever(back-end)



### Lado do Cliente

0.
  **Navege para a pasta do front-end**
  ```bash
      cd client
   ```


2. **Criar o Arquivo de Ambiente**:
   - Crie um arquivo chamado `.env` na pasta do cliente. Você pode se inspirar no arquivo `.env.example`.
   - Adicione a seguinte variável ao seu arquivo `.env`:

   ```plaintext
   BASE_API_URL=
   ```

   Certifique-se de que o `BASE_API_URL` aponte para a URL do seu servidor API. Por exemplo, se o seu servidor estiver rodando localmente na porta 3000, você pode configurar como:

   ```plaintext
   BASE_API_URL=http://localhost:3000
   ```

3. **Instalação de Dependências**:
   - Utilize npm, yarn ou pnpm para instalar as dependências do cliente. Se você estiver usando npm, execute:

   ```bash
   npm i
   ```

   Aguarde até que todas as dependências sejam instaladas.

4. **Executar a Aplicação**:
   - Após a instalação das dependências, inicie a aplicação com o seguinte comando:

   ```bash
   npm run dev
   ```

5. **Verificação de Erros**:
   - Se ocorrer algum erro ao iniciar a aplicação, verifique se o servidor da API está em execução e acessível na URL definida em `BASE_API_URL`. Certifique-se de que o servidor esteja rodando corretamente e que não haja conflitos de porta.

### Lado do Servidor

1. **Navegando na Pasta do Servidor**:
   - Acesse a pasta do servidor:

   ```bash
   cd server
   ```

2. **Criar o Arquivo `.env`**:
   - Navegue até o arquivo `.env.example` e copie suas configurações para um novo arquivo chamado `.env`.
   - O arquivo `.env` deve conter as seguintes variáveis:

   ```plaintext
   DATABASE_URL=
   PORT=3000
   JWT_SECRET="so-you-like-bananas"
   ```

3. **Configuração do `DATABASE_URL`**:
   - O `DATABASE_URL` deve ser uma URL válida do PostgreSQL. Um exemplo de URL válida é:

   ```
   postgresql://user:password@localhost:5432/mydatabase
   ```

      Aqui está uma breve explicação sobre os componentes da URL:
   - `postgresql`: o tipo do banco de dados.
   - `user`: o nome de usuário para acessar o banco de dados.
   - `password`: a senha do usuário.
   - `localhost`: o endereço do servidor de banco de dados (neste caso, está rodando localmente).
   - `5432`: a porta padrão do PostgreSQL.
   - `mydatabase`: o nome do banco de dados que você deseja usar.

   Se você precisar de mais informações sobre como obter essa URL, consulte o arquivo `docker-compose.yml`.

   

4. **Iniciar o Banco de Dados**:
   - Para rodar o banco de dados PostgreSQL usando Docker, execute:

   ```bash
   docker-compose up -d
   ```

5. **Instalação de Dependências**:
   
5. **Instale as dependências do servidor**:
   - Utilize o npm, yarn ou pnpm para instalar as dependências. Por exemplo, se você estiver usando npm, execute:

   ```bash
   npm install
   ```

6. **Aplicar Migrações do Prisma**:
   - Para aplicar as migrações ao seu banco de dados, execute:

   ```bash
   npx prisma migrate dev
   ```

7. **Popular  Dados de dados (seed)**:
  
   - Para adicionar  usuários e vários contatos para cada um no seu banco de dados, execute:

   ```bash
   npm run prisma:seed
   ```

     Isso incluirá 4 usuário  e  um usuário padrão que pode ser usado para fazer login. Os dados do usuário padrão são:
   - **CPF**: `52998224725`
   - **Senha**: `123456`

9. **Verificar os Dados no Prisma Studio**:
   - Para confirmar se os dados foram criados corretamente, você pode acessar o Prisma Studio. Execute:

   ```bash
   npx prisma studio
   ```

     Isso abrirá uma aba no seu navegador em `http://localhost:5555`. 

   - **Finalizando o Prisma Studio**: Para fechar o Prisma Studio, pressione `Ctrl + C` no Windows ou `Command + C` no macOS ou Linux.

10. **Iniciar o Servidor**:
   - Por fim, execute o comando abaixo para iniciar o servidor:


   ```bash
   npm run dev
   ```


### Aviso !!! ⚠️

- Você só pode executar comandos na respectiva diretório de cada parte (cliente ou servidor). Caso contrário, os comandos não funcionarão corretamente.

## ESPERO QUE GOSTE ❤️❤️❤️
