import { test, expect } from '../fixtures/adblock.fixture';
import { LoginPage } from '../pages/login.page';
import loginData from '../data/login.data.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  loginPage = new LoginPage(page);
});

test('valid login', async ({ page }) => {
  const data = loginData.validLogin;

  await loginPage.login(data.username, data.password);
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();

  await loginPage.logout();
  await expect(
    page.getByText('You logged out of the secure area!')
  ).toBeVisible();
});

test('invalid username', async ({ page }) => {
  const data = loginData.invalidUsername;

  await loginPage.login(data.username, data.password);
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

test('invalid password', async ({ page }) => {
  const data = loginData.invalidPassword;

  await loginPage.login(data.username, data.password);
  await expect(page.getByText('Your password is invalid!')).toBeVisible();
});
