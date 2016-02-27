# mocha-webpack [![Build Status][build-badge]][build] [![npm package][npm-badge]][npm]

Precompiles your server-side webpack bundles before running mocha.  Inspired by [karma-webpack] alternatives usage, but this is for Node.js!

Looking for a test runner for the browser? Use [karma-webpack] instead.

## Project status
Work in progress...


## Why you might need or want this module
You're  building universal javascript applications with webpacks awesome features like including css or images and wanna test your code also in Node?

No problem! Just precompile your tests before running mocha:

```bash
$ webpack test.js output.js && mocha output.js
```

Seems pretty easy. But there are some disadvantages with this approach:
- you can no longer use mochas glob file matching
- you have to precompile each single test or maintain a test entry file and require the desired files

This project is a optimized version of this simple approach with following features:
- precompiles your test files automatically with webpack before executing tests
- define tests to execute like mocha:
  - run a single test file
  - run all tests in the desired directory & if desired in all subdirectories
  - run all tests matching a glob pattern
- rerun only modified & dependent tests in watch mode on file change


## Installing mocha-webpack
The recommended approach is to install mocha-webpack locally in your project's directory.

```bash
# install mocha, webpack & mocha-webpack as devDependencies
$ npm install --save-dev mocha webpack mocha-webpack
```
This will install `mocha`, `webpack` and `mocha-webpack` packages into `node_modules` in your project directory and also save these as `devDependencies` in your package.json.

Congratulations, you are ready to run mocha-webpack for the first time in your project!

```bash
# display version of mocha-webpack
$ node ./node_modules/mocha-webpack/bin/_mocha -v

# display available commands & options of mocha-webpack
$ node ./node_modules/mocha-webpack/bin/_mocha --help
```

### Configuring mocha-webpack

Typing `node ./node_modules/mocha-webpack/bin/_mocha ....` is just annoying and you might find it useful to configure your run commands as npm scripts inside your `package.json`.


**package.json**
```json
...
"scripts": {
    "test": "mocha-webpack --webpack-config webpack.config-test.js \"src/**/*.test.js\"",
  },
...
```

This allows you to run your test command simply by just typing `npm run test`.

In addition, the defined command tells mocha-webpack to use the provided webpack config file `webpack.config-test.js` and to execute all tests matching the pattern `src/**/*.test.js`.

**webpack.config-test.js** - example config
```javascript
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }) // apply source-maps when running tests
  ],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "#source-map" // write source-maps
};
```

Maybe you noticed, [entry](https://webpack.github.io/docs/configuration.html#entry), [output.filename](https://webpack.github.io/docs/configuration.html#output-filename) and [output.path](https://webpack.github.io/docs/configuration.html#output-path) are completely missing in this config. mocha-webpack does this automatically for you and if you would specify it anyway, it will be overridden by mocha-webpack.

**Note:** mocha-webpack emits the generated files currently into `./tmp/mocha-webpack`. So you should make sure that this folder is ignored in your `.gitignore` file. In future versions this could be unnecessary.


## Sample commands

run a single test

```bash
mocha-webpack --webpack-config webpack.config-test.js simple.test.js
```

run all tests by glob

```bash
mocha-webpack --webpack-config webpack.config-test.js "test/**/*.js"
```

run all tests in directory "test" (add `--recursive` to include subdirectories)

```bash
mocha-webpack --webpack-config webpack.config-test.js test
```

run all tests in directory "test" matching the file pattern "\*.test.js"

```bash
mocha-webpack --webpack-config webpack.config-test.js --glob "*.test.js" test
```

Watch mode? just add `--watch`

```
mocha-webpack --webpack-config webpack.config-test.js --watch test
```


### CLI options

see `mocha-webpack --help`

### License

MIT

[karma-webpack]: https://github.com/webpack/karma-webpack
[build-badge]: https://travis-ci.org/zinserjan/mocha-webpack.svg?branch=master
[build]: https://travis-ci.org/zinserjan/mocha-webpack
[npm-badge]: https://img.shields.io/npm/v/mocha-webpack.svg?style=flat-square
[npm]: https://www.npmjs.org/package/mocha-webpack
