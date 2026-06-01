import { test, expect } from '../../fixtures/adblock.fixture';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';

let forgotPasswordPage: ForgotPasswordPage;

test.beforeEach(async ({ page }) => {
  forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.open();
});

test('successful password reset', async () => {
  await forgotPasswordPage.requestPasswordReset('test@example.com');

  await expect(forgotPasswordPage.alertMessage).toContainText(
    'An e-mail has been sent to you which explains how to reset your password.'
  );
});

test('invalid email format', async () => {
  await forgotPasswordPage.requestPasswordReset('invEmail');

  await expect(forgotPasswordPage.emailValidationMessage).toContainText(
    'Please enter a valid email address.'
  );
});

test('invalid email', async () => {
  await forgotPasswordPage.requestPasswordReset('invEmail@example');

  await expect(forgotPasswordPage.alertMessage).toContainText(
    'Your email is invalid!'
  );
});
