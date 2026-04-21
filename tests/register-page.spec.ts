import { test, expect } from '../fixtures/adblock.fixture';
import { RegisterPage } from '../pages/register.page';
import registerData from '../data/register.data.json';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
  registerPage = new RegisterPage(page);
});

test('successful registration', async () => {
  const username = `user${Date.now()}`;
  const { password } = registerData.validRegister;

  await registerPage.register(username, password, password);
  await expect(registerPage.message).toContainText(
    'Successfully registered, you can log in now.'
  );
});

test('password mismatch', async () => {
  const username = `user${Date.now()}`;
  const { password, confirmPassword } = registerData.passwordMismatch;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText('Passwords do not match.');
});

test('empty fields', async () => {
  const { username, password, confirmPassword } = registerData.emptyFields;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText('All fields are required.');
});

test('username too short', async () => {
  const { username, password, confirmPassword } = registerData.shortUsername;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText(
    'Username must be at least 3 characters long.'
  );
});

test('password too short', async () => {
  const username = `user${Date.now()}`;
  const { password, confirmPassword } = registerData.shortPassword;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText(
    'Password must be at least 4 characters long.'
  );
});
