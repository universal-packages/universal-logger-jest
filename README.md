# Logger Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Flogger-jest.svg)](https://www.npmjs.com/package/@universal-packages/logger-jest)
[![Testing](https://github.com/universal-packages/universal-logger-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-logger-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-logger-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-logger-jest)

Jest matchers for [Logger](https://github.com/universal-packages/universal-logger) testing.

## Install

```shell
npm install @universal-packages/logger-jest

npm install @universal-packages/logger
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/logger-jest']
}
```

## Matchers

### toHaveLogged

```js
import { Logger } from '@universal-packages/logger'

it('should logged log', async () => {
  const logger = new Logger()

  logger.log({ level: 'INFO', message: 'Hello World' })

  expect(Logger).toHaveLogged({ level: 'INFO', message: 'Hello World' })
})
```

### toHaveLoggedTotal

```js
import { Logger } from '@universal-packages/logger'

it('should logged a total number of logs', async () => {
  const logger = new Logger()

  logger.log({ level: 'INFO', message: 'Hello World' })

  expect(Logger).toHaveLoggedTotal(1)
})
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/logger-jest" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
