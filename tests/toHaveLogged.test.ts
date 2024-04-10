import { Logger } from '@universal-packages/logger'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveLogged', (): void => {
  it('asserts a log entry being logged', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    expect(Logger).toHaveLogged({ level: 'INFO', title: 'Test', message: 'Test message' })
    expect(Logger).toHaveLogged({ title: 'Test', message: 'Test message' })
    expect(Logger).toHaveLogged({ message: 'Test message' })
    expect(Logger).not.toHaveLogged({ title: 'Other', message: 'Other message' })
  })

  it('fails and shows if no logs were logged', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    let error: Error

    try {
      expect(Logger).toHaveLogged({ level: 'INFO', title: 'Test', message: 'Test message' })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Logger to have logged the given entry, but no entries were logged at all.')
  })

  it('fails and shows the if a log entry was not logged and tells which ones where', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    let error: Error

    try {
      expect(Logger).toHaveLogged({ level: 'INFO', title: 'Other', message: 'Other message' })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual(`expected Logger to have logged the given entry, but it did not
Entries were:
- Expected
+ Received

  Object {
    "level": "INFO",
-   "message": "Other message",
-   "title": "Other",
+   "message": "Test message",
+   "title": "Test",
  }`)
  })

  it('fails and shows the if a log entry was logged but it was not expected', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    let error: Error

    try {
      expect(Logger).not.toHaveLogged({ level: 'INFO', title: 'Test', message: 'Test message' })
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Logger to not have logged the given entry, but it did.')
  })
})
