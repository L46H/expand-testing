import { test, expect } from '../fixtures/adblock.fixture';
import { RegisterPage } from '../pages/register.page';
import registerData from '../data/register.data.json';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
  registerPage = new RegisterPage(page);
});

test('successful registration', async ({ page }) => {
  const username = `user${Date.now()}`;
  const data = registerData.validRegister;

  await registerPage.register(username, data.password, data.password);
  await expect(
    page.getByText('Successfully registered, you can log in now.')
  ).toBeVisible();
});

test('password mismatch', async ({ page }) => {
  const username = `user${Date.now()}`;
  const data = registerData.passwordMismatch;

  await registerPage.register(username, data.password, data.confirmPassword);
  await expect(page.getByText('Passwords do not match.')).toBeVisible();
});

test('empty fields', async ({ page }) => {
  const data = registerData.emptyFields;

  await registerPage.register(
    data.username,
    data.password,
    data.confirmPassword
  );
  await expect(page.getByText('All fields are required.')).toBeVisible();
});

test('username too short', async ({ page }) => {
  const data = registerData.shortUsername;

  await registerPage.register(
    data.username,
    data.password,
    data.confirmPassword
  );
  await expect(
    page.getByText('Username must be at least 3 characters long.')
  ).toBeVisible();
});

test.only('password too short', async ({ page }) => {
  const username = `user${Date.now()}`;
  const data = registerData.shortPassword;

  await registerPage.register(username, data.password, data.confirmPassword);
  await expect(
    page.getByText('Password must be at least 4 characters long.')
  ).toBeVisible();
});
