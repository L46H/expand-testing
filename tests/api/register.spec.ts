import { test, expect } from '@playwright/test';
import registerData from '../../data/register.data.json';
import { endpoints } from '../../constants/endpoints';

test('successful registration', async ({ request }) => {
  const name = `user${Date.now()}`;
  const email = `user${Date.now()}@example.com`;
  const { password } = registerData.validRegister;

  const response = await request.post(endpoints.register, {
    data: {
      name,
      email,
      password
    }
  });

  const jsonData = await response.json();

  expect(response.status()).toBe(201);
  expect(jsonData.success).toBe(true);
  expect(jsonData.data.id).toBeTruthy();
  expect(jsonData.data.email).toBe(email);
  expect(jsonData.data.name).toBe(name);
});

test('invalid input data', async ({ request }) => {
  const response = await request.post('/notes/api/users/register', {
    data: {}
  });
  const jsonData = await response.json();

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});
