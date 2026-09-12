import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/auth.client';
import loginData from '../../data/api/login.data.json';
import { endpoints } from '../../constants/endpoints';

test('successful login', async ({ request }) => {
  const authClient = new AuthClient(request);
  const { email, password } = loginData.validLogin;

  const response = await authClient.login({ email, password });
  const jsonData = await response.json();

  expect(response.status()).toBe(200);
  expect(jsonData.success).toBe(true);
  expect(jsonData.data.email).toBe(email);
  expect(jsonData.data.token).toBeTruthy();
});

test('login with empty body', async ({ request }) => {
  const authClient = new AuthClient(request);

  const response = await authClient.login({});
  const jsonData = await response.json();

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});

test('login with invalid credentials', async ({ request }) => {
  const authClient = new AuthClient(request);
  const { email, password } = loginData.invalidLogin;

  const response = await authClient.login(loginData.invalidLogin);
  const jsonData = await response.json();

  expect(response.status()).toBe(401);
  expect(jsonData.success).toBe(false);
});
