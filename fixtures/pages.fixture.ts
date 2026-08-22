import { test as base } from './adblock.fixture';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { InputsPage } from '../pages/inputs.page';
import { LoginPage } from '../pages/login.page';
import { OtpLoginPage } from '../pages/otp-login.page';
import { RegisterPage } from '../pages/register.page';

type PageFixtures = {
  forgotPasswordPage: ForgotPasswordPage;
  inputsPage: InputsPage;
  loginPage: LoginPage;
  otpLoginPage: OtpLoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<PageFixtures>({
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  inputsPage: async ({ page }, use) => {
    await use(new InputsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  otpLoginPage: async ({ page }, use) => {
    await use(new OtpLoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  }
});

export { expect } from '@playwright/test';
