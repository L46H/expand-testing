import { test, expect } from '../fixtures/adblock.fixture';

test('user can login and logout successfully', async ({ page }) => {
    await page.goto('/login');

    const usernameInput = page.getByLabel('Username');
    const passwordInput = page.getByLabel('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });
    const logoutButton = page.getByRole('link', { name: 'Logout' });

    const credentials = { username: 'practice', password: 'SuperSecretPassword!' };

    await usernameInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await loginButton.click();
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();

    await logoutButton.click();
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
});