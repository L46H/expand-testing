import { test, expect } from '../../fixtures/api.fixture';
import type {
  ErrorResponse,
  RegisterResponse
} from '../../api/models/auth.models';

test('successful registration', async ({ authClient, newUser }) => {
  const response = await authClient.register(newUser);
  const jsonData = (await response.json()) as RegisterResponse;

  expect(response.status()).toBe(201);
  expect(jsonData.success).toBe(true);
  expect(jsonData.data.id).toBeTruthy();
  expect(jsonData.data.email).toBe(newUser.email);
  expect(jsonData.data.name).toBe(newUser.name);
});

test('registration with empty body', async ({ authClient }) => {
  const response = await authClient.register({});
  const jsonData = (await response.json()) as ErrorResponse;

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});
