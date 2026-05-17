import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly retrieveButton: Locator;
  readonly alertMessage: Locator;
  readonly emailValidationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel('E-mail');
    this.retrieveButton = page.getByRole('button', {
      name: 'Retrieve password'
    });
    this.alertMessage = page.getByRole('alert');
    this.emailValidationMessage = page.locator('#email + .invalid-feedback');
  }

  async requestPasswordReset(email: string) {
    await this.emailInput.fill(email);
    await this.retrieveButton.click();
  }
}
