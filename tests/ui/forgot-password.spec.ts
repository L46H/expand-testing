import { test, expect } from '../../fixtures/pages.fixture';

test.beforeEach(async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.open();
});

test('successful password reset', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.requestPasswordReset('test@example.com');

  await expect(forgotPasswordPage.alertMessage).toContainText(
    'An e-mail has been sent to you which explains how to reset your password.'
  );
});

test('invalid email format', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.requestPasswordReset('invEmail');

  await expect(forgotPasswordPage.emailValidationMessage).toContainText(
    'Please enter a valid email address.'
  );
});

test('invalid email', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.requestPasswordReset('invEmail@example');

  await expect(forgotPasswordPage.alertMessage).toContainText(
    'Your email is invalid!'
  );
});
