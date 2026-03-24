import { test, expect as baseExpect, mergeExpects } from '@playwright/test';

const custom1 = baseExpect.extend({
    toBeFoo() { return { pass: true, message: () => '' }; }
});

try {
    mergeExpects(baseExpect, custom1);
    console.log("Merge base + custom works");
} catch(e) {
    console.log("Merge base + custom fails:", e.message);
}

test('dummy', () => {});
