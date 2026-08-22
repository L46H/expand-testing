import { test, expect } from '../../fixtures/pages.fixture';
import registerData from '../../data/ui/register.data.json';

test.beforeEach(async ({ registerPage }) => {
  await registerPage.open();
});

test('successful registration', async ({ registerPage }) => {
  const username = `user${Date.now()}`;
  const { password } = registerData.validRegister;

  await registerPage.register(username, password, password);
  await expect(registerPage.message).toContainText(
    'Successfully registered, you can log in now.'
  );
});

test('password mismatch', async ({ registerPage }) => {
  const username = `user${Date.now()}`;
  const { password, confirmPassword } = registerData.passwordMismatch;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText('Passwords do not match.');
});

test('empty fields', async ({ registerPage }) => {
  const { username, password, confirmPassword } = registerData.emptyFields;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText('All fields are required.');
});

test('username too short', async ({ registerPage }) => {
  const { username, password, confirmPassword } = registerData.shortUsername;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText(
    'Username must be at least 3 characters long.'
  );
});

test('password too short', async ({ registerPage }) => {
  const username = `user${Date.now()}`;
  const { password, confirmPassword } = registerData.shortPassword;

  await registerPage.register(username, password, confirmPassword);
  await expect(registerPage.message).toContainText(
    'Password must be at least 4 characters long.'
  );
});
