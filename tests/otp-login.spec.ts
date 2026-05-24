import { test, expect } from '../fixtures/adblock.fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('/otp-login');
});

test('successful OTP login', async ({ page }) => {
  const email = 'practice@expandtesting.com';
  const otp = '214365';

  await page.getByLabel('Your Email Address').fill(email);
  await page.getByRole('button', { name: 'Send OTP Code' }).click();
  await expect(page.locator('#otp-message')).toContainText(
    `We've sent an OTP code to your email: ${email}`
  );

  await page.getByPlaceholder('Enter OTP code').fill(otp);
  await page.getByRole('button', { name: 'Verify OTP' }).click();
  await expect(page.getByRole('alert')).toContainText(
    'You logged into a secure area!'
  );
});
