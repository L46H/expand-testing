import { test, expect } from '../fixtures/adblock.fixture';
import { LoginPage } from '../pages/login.page';
import loginData from '../data/login.data.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  loginPage = new LoginPage(page);
});

test('successful login', async () => {
  const { username, password } = loginData.validLogin;

  await loginPage.login(username, password);
  await expect(loginPage.message).toContainText(
    'You logged into a secure area!'
  );
});

test('successful logout', async () => {
  const { username, password } = loginData.validLogin;

  await loginPage.login(username, password);
  await loginPage.logout();
  await expect(loginPage.message).toContainText(
    'You logged out of the secure area!'
  );
});

test('invalid username', async () => {
  const { username, password } = loginData.invalidUsername;

  await loginPage.login(username, password);
  await expect(loginPage.message).toContainText('Your username is invalid!');
});

test('invalid password', async () => {
  const { username, password } = loginData.invalidPassword;

  await loginPage.login(username, password);
  await expect(loginPage.message).toContainText('Your password is invalid!');
});
