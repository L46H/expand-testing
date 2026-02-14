import { test, expect } from '../fixtures/adblock.fixture';

test('displays entered inputs', async ({ page }) => {
  await page.goto('/inputs');

  const numberInput = page.getByLabel('Input: Number');
  const textInput = page.getByLabel('Input: Text');
  const passwordInput = page.getByLabel('Input: Password');
  const dateInput = page.getByLabel('Input: Date');
  const displayButton = page.getByRole('button', { name: 'Display Inputs' });

  const inputs = {
    number: '12345',
    text: 'Hello World',
    password: 'Password123*',
    date: '2025-11-11'
  };

  await numberInput.fill(inputs.number);
  await textInput.fill(inputs.text);
  await passwordInput.fill(inputs.password);
  await dateInput.fill(inputs.date);

  await displayButton.click();

  for (const value of Object.values(inputs)) {
    await expect(page.getByText(value)).toBeVisible();
  }
});
