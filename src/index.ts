import { expect } from '@jest/globals'
import { LogEntry, Logger, TestTransport } from '@universal-packages/logger'

import './globals'

afterEach(() => {
  TestTransport.reset()
})

function toHaveLogged(_logger: Logger, logEntry: Partial<LogEntry>): jest.CustomMatcherResult {
  const logEntryKeys = Object.keys(logEntry)
  const loggedEntries = TestTransport.logHistory.map((inHistoryLogEntry) => {
    return Object.keys(inHistoryLogEntry).reduce((acc, key) => {
      if (logEntryKeys.includes(key)) {
        acc[key] = inHistoryLogEntry[key]
      }

      return acc
    }, {})
  })

  const pass = loggedEntries.some((loggedEntry: LogEntry) => {
    return this.equals(logEntry, loggedEntry)
  })

  if (pass) {
    return {
      message: () => `expected Logger to not have logged the given entry, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (loggedEntries.length === 0) {
          return `expected Logger to have logged the given entry, but no entries were logged at all.`
        } else {
          return `expected Logger to have logged the given entry, but it did not\n\Entries were:\n${loggedEntries
            .map((loggedEntry: LogEntry) => this.utils.diff(logEntry, loggedEntry))
            .join('\n')}`
        }
      },
      pass
    }
  }
}

function toHaveLoggedTotal(_logger: Logger, count: number): jest.CustomMatcherResult {
  const pass = TestTransport.logHistory.length === count

  if (pass) {
    return {
      message: () => `expected Logger to not have logged a total of ${count} entries, but it did.`,
      pass
    }
  } else {
    return {
      message: () => {
        if (TestTransport.logHistory.length === 0) {
          return `expected Logger to have logged a total of ${count} entries, but no entries were logged at all.`
        } else {
          return `expected Logger to have logged a total of ${count} entries, but it logged a total of ${TestTransport.logHistory.length} entries.`
        }
      },
      pass
    }
  }
}

expect.extend({
  toHaveLogged,
  toHaveLoggedTotal
})
