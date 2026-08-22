import { test, expect } from '../../fixtures/pages.fixture';
import loginData from '../../data/ui/login.data.json';

test.beforeEach(async ({ otpLoginPage }) => {
  await otpLoginPage.open();
});

test('successful OTP login', async ({ otpLoginPage }) => {
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

test('incorrect OTP code', async ({ otpLoginPage }) => {
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

test('invalid email', async ({ otpLoginPage }) => {
  await otpLoginPage.emailInput.fill('invEmail');

  await expect(otpLoginPage.emailValidationMessage).toContainText(
    'Please enter a valid email address.'
  );
});
