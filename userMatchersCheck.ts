import { expect } from '@playwright/test';

const symbols = Object.getOwnPropertySymbols(expect);
console.log("Symbols on base expect:", symbols.map(s => s.toString()));

try {
  const symbolVal = expect[Symbol.for('userMatchers')];
  console.log("Value of Symbol.for('userMatchers') on base expect:", typeof symbolVal);
} catch (e) {
  console.log("Error reading symbol from base expect");
}
