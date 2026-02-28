import { test, expect } from '../fixtures/adblock.fixture';
import { LoginPage } from '../pages/login.page';

const credentials = {
  username: 'practice',
  password: 'SuperSecretPassword!',
  invalidUsername: 'invPractice',
  invalidPassword: 'invPass'
};

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  loginPage = new LoginPage(page);
});

test('login and logout successfully', async ({ page }) => {
  await loginPage.login(credentials.username, credentials.password);
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();

  await loginPage.logout();
  await expect(
    page.getByText('You logged out of the secure area!')
  ).toBeVisible();
});

test('login with invalid username', async ({ page }) => {
  await loginPage.login(credentials.invalidUsername, credentials.password);
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

test('login with invalid password', async ({ page }) => {
  await loginPage.login(credentials.username, credentials.invalidPassword);
  await expect(page.getByText('Your password is invalid!')).toBeVisible();
});
