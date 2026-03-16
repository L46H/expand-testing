import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
  registerPage = new RegisterPage(page);
});

test('successful registration', async ({ page }) => {
  const username = `user${Date.now()}`;

  await registerPage.register(username, 'Password123*', 'Password123*');
  await expect(
    page.getByText('Successfully registered, you can log in now.')
  ).toBeVisible();
});

test('password mismatch', async ({ page }) => {
  const username = `user${Date.now()}`;

  await registerPage.register(username, 'Password123*', 'Password1234*');
  await expect(page.getByText('Passwords do not match.')).toBeVisible();
});

test('empty fields', async ({ page }) => {
  await registerPage.register('', '', '');

  await expect(page.getByText('All fields are required.')).toBeVisible();
});

test('username too short', async ({ page }) => {
  await registerPage.register('ab', 'Password123*', 'Password123*');

  await expect(
    page.getByText('Username must be at least 3 characters long.')
  ).toBeVisible();
});
