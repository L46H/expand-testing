import { test, expect } from '../fixtures/adblock.fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('/forgot-password');
});

test('successful password reset', async ({ page }) => {
  await page.getByLabel('E-mail').fill('test@example.com');
  await page.getByRole('button', { name: 'Retrieve password' }).click();

  await expect(page.getByRole('alert')).toContainText(
    'An e-mail has been sent to you which explains how to reset your password.'
  );
});

test('invalid email format', async ({ page }) => {
  await page.getByLabel('E-mail').fill('invEmail');
  await page.getByRole('button', { name: 'Retrieve password' }).click();

  await expect(
    page.getByText('Please enter a valid email address.')
  ).toBeVisible();
});

test('invalid email', async ({ page }) => {
  await page.getByLabel('E-mail').fill('invEmail@example');
  await page.getByRole('button', { name: 'Retrieve password' }).click();

  await expect(page.getByRole('alert')).toContainText('Your email is invalid!');
});
