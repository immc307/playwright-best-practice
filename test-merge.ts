import { expect as baseExpect, mergeExpects, test } from '@playwright/test';
const customExpect1 = baseExpect.extend({
  toBeFoo() { return { pass: true, message: () => '' }; }
});
console.log('customExpect1 type:', typeof customExpect1);

try {
  const merged = mergeExpects(customExpect1);
  console.log('Merge successful', typeof merged);
} catch (e) {
  console.log('Merge failed:', e.message);
}

test('dummy', () => {});
