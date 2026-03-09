# API de Registro Histórico de Métricas de Exames de Saúde

Esta API permite que os usuários registrem e acompanhem os resultados de seus exames de saúde, associando cada resultado a métricas específicas. Os usuários podem criar, atualizar e remover métricas, além de criar e visualizar os resultados dos exames.

## Funcionalidades

A API possue dois recursos principais:

1. **Métricas**: Permite criar, listar, atualizar e remover métricas. Cada métrica possui um nome e uma unidade de medida.
2. **Resultados de Exames**: Permite criar, e listar resultados de exames. Cada resultado de exame possui uma data e uma lista de métricas associadas, cada uma com um valor específico.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Zod para validação de dados
- Docker para gerenciamento do banco de dados

## Estrutura do Projeto

- `src/controllers`: Contém os controladores para as rotas da API.
- `src/middlewares`: Contém os middlewares para autenticação e captura de erros.
- `src/models`: Contém os modelos de dados e as funções de acesso ao banco de dados.
- `src/routers`: Contém as definições das rotas da API.
- `src/server.js`: Ponto de entrada da aplicação.

## Configuração e Execução

Para executar a aplicação, você precisa ter o gerenciados de pacotes NPM, Node.js e o Docker instalados em sua máquina. Siga os passos abaixo para configurar e iniciar a aplicação:

1. Clone o repositório e navegue até a pasta do projeto.

```bash
git clone https://github.com/gihoekveld/health.git
cd health
```

2. Instale as dependências com `npm install`.

```bash
npm install
```

3. Configure as variáveis de ambiente necessárias em um arquivo `.env` na raiz do projeto.

```bash
cp .env.sample .env
```

4. Execute a aplicação em modo de desenvolvimento.

Garanta que o aplicativo Docker está rodando. O comando abaixo irá criar o container do banco no Docker e iniciar o servidor da aplicação.

```bash
npm run dev
```

## Endpoints

## Usuário

### `POST /user`

Registra um novo usuário.

- Exemplo de payload:

```json
{
  "name": "Giselle Hoekveld",
  "email": "gihoekveld@gmail.com",
  "password": "senha123"
}
```

### `PATCH /user/name`

Atualiza o nome do usuário autenticado.

- Exemplo de payload:

```json
{
  "name": "Giselle Hoekveld Silva"
}
```

## Authenticação

A API utiliza JWT para autenticação. Os usuários devem se registrar e fazer login para obter um token de acesso, que deve ser incluído no cabeçalho `Authorization` das requisições subsequentes.

### `POST /auth/login`

Autentica um usuário e retorna um token JWT e um token de refresh.

- Exemplo de payload:

```json
{
  "email": "gihoekveld@gmail.com",
  "password": "senha123"
}
```

- Exemplo de resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImdpaG9la3ZlbGRAZ21haWwuY29tIn0sImlhdCI6MTc3Mjk5NTM0NSwiZXhwIjoxNzcyOTk2MjQ1fQ.hmp1-EnEUoLe6KqNFJVAbbfCYZum6vrzQ6GBlfm3cgQ",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImdpaG9la3ZlbGRAZ21haWwuY29tIn0sImlhdCI6MTc3Mjk5NTM0NSwiZXhwIjoxNzczNjAwMTQ1fQ.2NuLBGj6LtHV94T2cmCBrwRVok5Zzk927u38QwcbZDE"
}
```

### `POST /auth/refresh-token`

Renova o token JWT.

- Exemplo de payload:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImdpaG9la3ZlbGRAZ21haWwuY29tIn0sImlhdCI6MTc3Mjk5NTM0NSwiZXhwIjoxNzczNjAwMTQ1fQ.2NuLBGj6LtHV94T2cmCBrwRVok5Zzk927u38QwcbZDE"
}
```

- Exemplo de resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImdpaG9la3ZlbGRAZ21haWwuY29tIn0sImlhdCI6MTc3Mjk5NTM0NSwiZXhwIjoxNzczNjAwMTQ1fQ.2NuLBGj6LtHV94T2cmCBrwRVok5Zzk927u38QwcbZDE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImdpaG9la3ZlbGRAZ21haWwuY29tIn0sImlhdCI6MTc3Mjk5NTM0NSwiZXhwIjoxNzczNjAwMTQ1fQ.2NuLBGj6LtHV94T2cmCBrwRVok5Zzk927u38QwcbZDE"
}
```

### Métricas

### `POST /metrics`

Cria uma nova métrica.

- Exemplo de payload:

```json
{
  "name": "Pressão Arterial",
  "unit": "mmHg"
}
```

- Exemplo de resposta:

```json
{
  "id": 1,
  "name": "Pressão Arterial",
  "unit": "mmHg"
}
```

### `GET /metrics`

Lista todas as métricas.

- Exemplo de resposta:

```json
{
  "metrics": [
    {
      "id": 1,
      "name": "Pressão Arterial",
      "unit": "mmHg"
    },
    {
      "id": 2,
      "name": "Glicemia",
      "unit": "mg/dL"
    }
  ]
}
```

### `PUT /metrics/:id`

Atualiza uma métrica existente.

- Exemplo de payload:

```json
{
  "name": "Pressão Arterial Sistólica",
  "unit": "mmHg"
}
```

- Exemplo de resposta:

```json
{
  "metric": {
    "id": 1,
    "name": "Pressão Arterial Sistólica",
    "unit": "mmHg"
  }
}
```

### `DELETE /metrics/:id`

Remove uma métrica.

- Exemplo de resposta:

```json
{
  "message": "Métrica removida com sucesso!"
}
```

### Resultados de Exames

### `POST /tests`

Cria um novo resultado de exame.

- Exemplo de payload:

```json
{
  "date": "2024-06-01",
  "tests": [
    {
      "metricId": 1,
      "value": 120
    },
    {
      "metricId": 2,
      "value": 90
    }
  ]
}
```

### `GET /tests?from=2026-03-10&to=2026-03-10&metricIds=3,2`

Lista todos os resultados de exames, com a opção de filtrar por período e métricas específicas.

- Exemplo de resposta:

```json
{
  "history": [
    {
      "id": 1,
      "date": "2026-03-10T00:00:00.000Z",
      "testResults": [
        {
          "id": 1,
          "value": 300.01,
          "metric": {
            "id": 3,
            "name": "HDL",
            "unit": "mg/dL"
          }
        },
        {
          "id": 2,
          "value": 20.35,
          "metric": {
            "id": 2,
            "name": "Hemoglobina",
            "unit": "g/dL"
          }
        }
      ]
    }
  ]
}
```

### `PUT /tests/:id`

Atualiza um resultado de exame existente.

- Exemplo de payload:

```json
{
  "date": "2024-06-01",
  "tests": [
    {
      "metricId": 1,
      "value": 125
    },
    {
      "metricId": 2,
      "value": 85
    }
  ]
}
```

### `DELETE /tests/:id`

Remove um resultado de exame.

- Exemplo de resposta:

```json
{
  "message": "Resultado de exame removido com sucesso!"
}
```
