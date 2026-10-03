import { test, expect } from '../../fixtures/api.fixture';
import loginData from '../../data/api/login.data.json';
import type {
  ErrorResponse,
  LoginResponse
} from '../../api/models/auth.models';

test('successful login', async ({ authClient, registeredUser }) => {
  const response = await authClient.login({
    email: registeredUser.email,
    password: registeredUser.password
  });
  const jsonData = (await response.json()) as LoginResponse;

  expect(response.status()).toBe(200);
  expect(jsonData.success).toBe(true);
  expect(jsonData.data.email).toBe(registeredUser.email);
  expect(jsonData.data.token).toBeTruthy();
});

test('login with empty body', async ({ authClient }) => {
  const response = await authClient.login({});
  const jsonData = (await response.json()) as ErrorResponse;

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});

test('login with invalid credentials', async ({ authClient }) => {
  const { email, password } = loginData.invalidLogin;
  const response = await authClient.login({
    email,
    password
  });
  const jsonData = (await response.json()) as ErrorResponse;

  expect(response.status()).toBe(401);
  expect(jsonData.success).toBe(false);
});
