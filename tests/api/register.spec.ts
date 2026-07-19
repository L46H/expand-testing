import { test, expect } from '@playwright/test';
import registerData from '../../data/api/register.data.json';
import { endpoints } from '../../constants/endpoints';
import { loginUser, deleteCurrentUser } from '../../helpers/api/auth.helper';

test('successful registration', async ({ request }) => {
  const timestamp = Date.now();
  const name = `user${timestamp}`;
  const email = `user${timestamp}@example.com`;
  const { password } = registerData.validRegister;

  let token: string | undefined;

  try {
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

    token = await loginUser(request, email, password);
  } finally {
    if (token) {
      await deleteCurrentUser(request, token);
    }
  }
});

test('registration with empty body', async ({ request }) => {
  const response = await request.post(endpoints.register, {
    data: {}
  });
  const jsonData = await response.json();

  expect(response.status()).toBe(400);
  expect(jsonData.success).toBe(false);
});
