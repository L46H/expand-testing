import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test('successful registration', async ({ page }) => {
  const username = `user${Date.now()}`;

  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('Password123*');
  await page
    .getByRole('textbox', { name: 'Confirm Password' })
    .fill('Password123*');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(
    page.getByText('Successfully registered, you can log in now.')
  ).toBeVisible();
});

test('password mismatch', async ({ page }) => {
  const username = `user${Date.now()}`;

  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('Password123*');
  await page
    .getByRole('textbox', { name: 'Confirm Password' })
    .fill('Password1234*');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Passwords do not match.')).toBeVisible();
});

test('empty fields', async ({ page }) => {
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('All fields are required.')).toBeVisible();
});
