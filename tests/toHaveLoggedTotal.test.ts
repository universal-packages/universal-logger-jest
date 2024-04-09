import { Logger } from '@universal-packages/logger'
import stripAnsi from 'strip-ansi'

import '../src'

describe('toHaveLoggedTotal', (): void => {
  it('asserts the total count of log entries', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    expect(Logger).toHaveLoggedTotal(3)
    expect(Logger).not.toHaveLoggedTotal(2)
  })

  it('fails and shows if no logs were logged', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    let error: Error

    try {
      expect(Logger).toHaveLoggedTotal(1)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Logger to have logged a total of 1 entries, but no entries were logged at all.')
  })

  it('fails and shows the if the count does not match the total count', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    let error: Error

    try {
      expect(Logger).toHaveLoggedTotal(2)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Logger to have logged a total of 2 entries, but it logged a total of 1 entries.')
  })

  it('fails and shows the if the count does match but it was not expected', async (): Promise<void> => {
    const logger = new Logger()
    await logger.prepare()

    logger.log({ level: 'INFO', title: 'Test', message: 'Test message' })
    await logger.waitForLoggingActivity()

    let error: Error

    try {
      expect(Logger).not.toHaveLoggedTotal(1)
    } catch (e) {
      error = e
    }

    expect(stripAnsi(error.message)).toEqual('expected Logger to not have logged a total of 1 entries, but it did.')
  })
})
