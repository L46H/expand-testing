import { test, expect } from '../fixtures/adblock.fixture';
import loginData from '../data/login.data.json';
import { OtpLoginPage } from '../pages/otp-login.page';

let otpLoginPage: OtpLoginPage;

test.beforeEach(async ({ page }) => {
  otpLoginPage = new OtpLoginPage(page);
  await otpLoginPage.open();
});

test('successful OTP login', async () => {
  const { email, otp } = loginData.validOtpLogin;

  await otpLoginPage.requestOtp(email);
  await expect(otpLoginPage.otpMessage).toContainText(
    `We've sent an OTP code to your email: ${email}`
  );

  await otpLoginPage.verifyOtp(otp);
  await expect(otpLoginPage.alertMessage).toContainText(
    'You logged into a secure area!'
  );
});

test('incorrect OTP code', async () => {
  const { email, otp } = loginData.invalidOtpCode;

  await otpLoginPage.requestOtp(email);
  await expect(otpLoginPage.otpMessage).toContainText(
    `We've sent an OTP code to your email: ${email}`
  );

  await otpLoginPage.verifyOtp(otp);
  await expect(otpLoginPage.otpMessage).toContainText(
    'The provided OTP code is incorrect. Please check your code and try again.'
  );
});

test('invalid email', async () => {
  await otpLoginPage.emailInput.fill('invEmail');

  await expect(otpLoginPage.emailValidationMessage).toContainText(
    'Please enter a valid email address.'
  );
});
