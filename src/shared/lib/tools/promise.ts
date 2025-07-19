// src/utils/promise.ts
/**
 * Creates a promise that resolves after specified milliseconds
 * @param ms - Delay duration in milliseconds
 * @param value - Optional value to resolve with
 * @returns Promise that resolves after delay
 */
export const delay = <T = void>(ms: number, value?: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(value as T), ms))
}

/**
 * Utility to reject after timeout if promise doesn't resolve
 * @param promise - Promise to wrap with timeout
 * @param ms - Timeout in milliseconds
 * @param timeoutError - Custom error to throw on timeout
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('Operation timed out'),
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(timeoutError), ms),
  )
  return Promise.race([promise, timeout])
}

// Optional additional promise utilities
export const PromiseUtils = {
  delay,
  withTimeout,
}
