# Registro Covid - Front

![Logo](.github/images/logo.svg)

Interface para gerenciamento dos dados do registroCOVID.

## Ferramentas Utilizadas

- [Visual Studio Code](https://code.visualstudio.com/): IDE.
- [Insomnia](https://insomnia.rest/): Workflows and Tools to make API Development Easier.

## Tecnologias Utilizadas 👨‍💻

- ⚛️ [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Material UI](https://material-ui.com/): React components for faster and easier web development. Build your own design system, or start with Material Design.
- [Formik](https://formik.org/): Formik is the world's most popular open source form library for React and React Native.
- :crocodile: [Formik Material-UI](https://stackworx.github.io/formik-material-ui/): Easily combine formik with Material-UI.
- [Yup](https://github.com/jquense/yup): Yup is a JavaScript schema builder for value parsing and validation.
- [SWR](https://swr.vercel.app/): React Hooks library for data fetching.
- [JSON Server](https://github.com/typicode/json-server): Get a full fake REST API with zero coding in less than 30 seconds (seriously). **Usamos essa api para testes**.
- [Jest](https://jestjs.io/en/): Framework para testes em Javascript.
- [Testing Library](https://testing-library.com/): Biblioteca de utilitários para teste que encorajam boas práticas.

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
