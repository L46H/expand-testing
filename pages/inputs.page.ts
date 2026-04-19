import { Page, Locator } from '@playwright/test';

export type InputsData = {
  number: string;
  text: string;
  password: string;
  date: string;
};

export class InputsPage {
  readonly page: Page;
  
  readonly numberInput: Locator;
  readonly textInput: Locator;
  readonly passwordInput: Locator;
  readonly dateInput: Locator;

  readonly numberOutput: Locator;
  readonly textOutput: Locator;
  readonly passwordOutput: Locator;
  readonly dateOutput: Locator;

  readonly displayButton: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.numberInput = page.locator('#input-number');
    this.textInput = page.locator('#input-text');
    this.passwordInput = page.locator('#input-password');
    this.dateInput = page.locator('#input-date');

    this.numberOutput = page.locator('#output-number');
    this.textOutput = page.locator('#output-text');
    this.passwordOutput = page.locator('#output-password');
    this.dateOutput = page.locator('#output-date');

    this.displayButton = page.getByRole('button', { name: 'Display Inputs' });
    this.clearButton = page.getByRole('button', { name: 'Clear Inputs' });
  }

  get allInputs(): Locator[] {
    return [
      this.numberInput,
      this.textInput,
      this.passwordInput,
      this.dateInput
    ];
  }

  get allOutputs(): Locator[] {
    return [
      this.numberOutput,
      this.textOutput,
      this.passwordOutput,
      this.dateOutput
    ];
  }

  async fillInputs(data: InputsData) {
    await this.numberInput.fill(data.number);
    await this.textInput.fill(data.text);
    await this.passwordInput.fill(data.password);
    await this.dateInput.fill(data.date);
  }

  async displayInputs() {
    await this.displayButton.click();
  }

  async clearInputs() {
    await this.clearButton.click();
  }
}
