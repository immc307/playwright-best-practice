export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeNumber(): R;
      toBeString(): R;
      toBeBoolean(): R;
      toBeOneOfValues(array: any[]): R;
      toHaveNoConsoleErrors(): R;
    }
  }
}