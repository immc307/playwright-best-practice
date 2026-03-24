import { pageExpect } from '../lib/fixtures/pages.fixture';
import { expect as consoleExpect } from '../lib/fixtures/console.fixture';
import { mergeExpects, test } from '@playwright/test';

console.log('pageExpect:', pageExpect);
console.log('consoleExpect:', consoleExpect);

test('dummy', () => {});
