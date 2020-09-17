# Registro Covid - Front

Interface para gerenciamento dos dados do registroCOVID.

## Ferramentas Utilizadas

- [Visual Studio Code](https://code.visualstudio.com/): IDE.
- [Insomnia](https://insomnia.rest/): Workflows and Tools to make API Development Easier.

## Tecnologias Utilizadas 👨‍💻

- ⚛️ [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Material UI](https://material-ui.com/): React components for faster and easier web development. Build your own design system, or start with Material Design.
- [SWR](https://swr.vercel.app/): React Hooks library for data fetching.
- [JSON Server](https://github.com/typicode/json-server): Get a full fake REST API with zero coding in less than 30 seconds (seriously). **Usamos essa api para testes**.
- [Jest](https://jestjs.io/en/): Framework para testes em Javascript.
- [Testing Library](https://testing-library.com/): Biblioteca de utilitários para teste que encorajam boas práticas.
- [cypress](https://www.cypress.io/): ferramenta para testes e2e.
- **TODO:** Continuar colocando aqui as outras libs usadas.

## Servidor de desenvolvimento 🚀🚀

Clonando o projeto

```BASH
git clone https://github.com/EscolaDeSaudePublica/registrocovid-front.git
```

Entrar no diretório

```BASH
cd registrocovid-front
```

Intalar as dependências do projeto

```BASH
npm install
```

Copiar o .env.example para .env

```
cp .env.example .env
```

Dar start no servidor de desenvolvimento

```BASH
npm start
```

Para rodar os testes continuamente

```BASH
npm test
```

Para rodar os testes uma única vez

```BASH
npm test:nowatch
```

## Rodando testes e2e localmente

### Prerequisito

É preciso subir toda a stack da aplicação como explicado acima para desenvolvimento. Ou seja, daqui em diante é preciso que o frontend esteja rodando na porta 3000 e o backend esteja rodando com docker na porta 7000. Não é preciso cadastrar usuária.

### Para executar os testes vendo os passos no browser

```BASH
npm run cypress:open
```

### Para executar os testes direto do terminal

```BASH
npm run cypress:run
```