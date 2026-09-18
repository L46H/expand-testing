import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/clients/auth.client';
import type {
  ErrorResponse,
  LoginResponse,
  RegisterResponse
} from '../../api/models/auth.models';
import { createUser } from '../../api/factories/user.factory';

test('successful registration', async ({ request }) => {
  const authClient = new AuthClient(request);
  const user = createUser();

  let token: string | undefined;

  try {
    const response = await authClient.register(user);

    const jsonData = (await response.json()) as RegisterResponse;

    expect(response.status()).toBe(201);
    expect(jsonData.success).toBe(true);
    expect(jsonData.data.id).toBeTruthy();
    expect(jsonData.data.email).toBe(user.email);
    expect(jsonData.data.name).toBe(user.name);

    const loginResponse = await authClient.login({
      email: user.email,
      password: user.password
    });

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
