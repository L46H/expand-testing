import { test, expect } from '../fixtures/adblock.fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('/forgot-password');
});

test('successful password reset', async ({ page }) => {
  await page.getByLabel('E-mail').fill('test@example.com');
  await page.getByRole('button', { name: 'Retrieve password' }).click();
});