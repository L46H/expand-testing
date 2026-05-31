import { Page, Locator } from '@playwright/test';

export class OtpLoginPage {
  readonly emailInput: Locator;
  readonly sendOtpButton: Locator;
  readonly otpMessage: Locator;
  readonly alertMessage: Locator;
  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;
  readonly emailValidationMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByLabel('Your Email Address');
    this.sendOtpButton = page.getByRole('button', { name: 'Send OTP Code' });
    this.otpMessage = page.locator('#otp-message');
    this.otpInput = page.getByPlaceholder('Enter OTP code');
    this.verifyOtpButton = page.getByRole('button', { name: 'Verify OTP' });
    this.emailValidationMessage = page.locator('#email + .invalid-feedback');
    this.alertMessage = page.getByRole('alert');
  }

  async open() {
    await this.page.goto('/otp-login');
  }

  async requestOtp(email: string) {
    await this.emailInput.fill(email);
    await this.sendOtpButton.click();
  }

  async verifyOtp(otp: string) {
    await this.otpInput.fill(otp);
    await this.verifyOtpButton.click();
  }

  async loginWithOtp(email: string, otp: string) {
    await this.requestOtp(email);
    await this.verifyOtp(otp);
  }
}
