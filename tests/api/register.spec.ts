import { test, expect } from '@playwright/test';
import registerData from '../../data/api/register.data.json';
import { AuthClient } from '../../api/clients/auth.client';
import type {
  ErrorResponse,
  LoginResponse,
  RegisterResponse
} from '../../api/models/auth.models';

test('successful registration', async ({ request }) => {
  const timestamp = Date.now();
  const name = `user${timestamp}`;
  const email = `user${timestamp}@example.com`;
  const { password } = registerData.validRegister;
  const authClient = new AuthClient(request);

  let token: string | undefined;

  try {
    const response = await authClient.register({
      name,
      email,
      password
    });

    const jsonData = (await response.json()) as RegisterResponse;

    expect(response.status()).toBe(201);
    expect(jsonData.success).toBe(true);
    expect(jsonData.data.id).toBeTruthy();
    expect(jsonData.data.email).toBe(email);
    expect(jsonData.data.name).toBe(name);

    const loginResponse = await authClient.login({ email, password });

    const loginData = (await loginResponse.json()) as LoginResponse;
    token = loginData.data.token;
  } finally {
    if (token) {
      await authClient.deleteCurrentUser(token);
    }
  }
});

test('registration with empty body', async ({ request }) => {
  const authClient = new AuthClient(request);

  const response = await authClient.register({});
  const jsonData = (await response.json()) as ErrorResponse;

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});
