# Create Min Express React

Create a minimal express.js server together with the simplicity of create-react-app. <br>

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Quick Overview

###### Install the cli:

```sh
npm install -g create-min-express-react

```

###### To run the dev server:

```sh
create-min-express-react my-app
cd my-app
npm install
npm run dev
```

The dev command utilizes the concurrently package to run the server via nodemon and uses react-scripts to run the react dev server.

###### To run the application:

```sh
create-min-express-react my-app
cd my-app
npm install
npm build
npm start
```

npm build will execute the react-scripts build command that comes with CRA.

###### To install dependencies for the server:

Navigate to your project directory and run

```sh
npm install <package name>
```

###### To install depecndencies for the client:

Navigate to your project directory and run

```sh
cd client
npm install <package name>
```

or

```sh
npm install <package name> --prefix client
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/create-min-express-react.svg
[npm-url]: https://www.npmjs.com/package/create-min-express-react
[downloads-url]: https://npmjs.org/package/create-min-express-react
[downloads-image]: https://img.shields.io/npm/dm/create-min-express-react.svg
