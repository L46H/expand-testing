import { test, expect } from '../fixtures/adblock.fixture';
import { InputsData, InputsPage } from '../pages/inputs.page';

const testData: InputsData = {
  number: '12345',
  text: 'Hello World',
  password: 'Password123*',
  date: '2025-11-11'
};

let inputsPage: InputsPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/inputs');
  inputsPage = new InputsPage(page);
});

test('display entered inputs', async () => {
  await inputsPage.fillInputs(testData);
  await inputsPage.displayInputs();

  await expect(inputsPage.numberOutput).toHaveText(testData.number);
  await expect(inputsPage.textOutput).toHaveText(testData.text);
  await expect(inputsPage.passwordOutput).toHaveText(testData.password);
  await expect(inputsPage.dateOutput).toHaveText(testData.date);
});

test('clear displayed inputs', async () => {
  await inputsPage.fillInputs(testData);
  await inputsPage.displayInputs();
  await inputsPage.clearInputs();

  for (const input of inputsPage.allInputs) {
    await expect(input).toBeEmpty();
  }

  for (const output of inputsPage.allOutputs) {
    await expect(output).toHaveCount(0);
  }
});
