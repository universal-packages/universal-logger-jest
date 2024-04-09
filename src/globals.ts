import { LogEntry } from '@universal-packages/logger'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveLogged(logEntry: Partial<LogEntry>): R
      toHaveLoggedTotal(count: number): R
    }
  }
}

export {}
