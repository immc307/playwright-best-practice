import { expect as baseExpect, mergeExpects } from '@playwright/test';
const customExpect1 = baseExpect.extend({
  toBeFoo() { return { pass: true, message: () => '' }; }
});

try {
  mergeExpects(undefined, customExpect1);
} catch (e) {
  console.log("Error:", e.message);
}
