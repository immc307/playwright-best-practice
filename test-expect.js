const { expect } = require('@playwright/test');
const myExpect = expect.extend({
  toBeFoo() { return { pass: true, message: () => '' }; }
});
console.log('myExpect type:', typeof myExpect);
console.log('myExpect keys:', Object.keys(myExpect));
if (myExpect) {
  console.log('myExpect has Symbol(userMatchers)?', Object.getOwnPropertySymbols(myExpect).map(s => s.toString()));
}
