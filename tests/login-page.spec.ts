import { test, expect } from '../fixtures/adblock.fixture';

const credentials = {
  username: 'practice',
  password: 'SuperSecretPassword!',
  invalidUsername: 'invPractice'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('login and logout successfully', async ({ page }) => {
  const usernameInput = page.getByLabel('Username');
  const passwordInput = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });
  const logoutButton = page.getByRole('link', { name: 'Logout' });

  await usernameInput.fill(credentials.username);
  await passwordInput.fill(credentials.password);
  await loginButton.click();
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();

  await logoutButton.click();
  await expect(
    page.getByText('You logged out of the secure area!')
  ).toBeVisible();
});

test('login with invalid username', async ({ page }) => {
    const passwordInput = page.getByLabel('Password');
    const usernameInput = page.getByLabel('Username');
    const loginButton = page.getByRole('button', { name: 'Login' });

  await usernameInput.fill(credentials.invalidUsername);
  await passwordInput.fill(credentials.password);
  await loginButton.click();
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});