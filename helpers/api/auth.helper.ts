import { APIRequestContext, expect } from '@playwright/test';
import { endpoints } from '../../constants/endpoints';

type LoginResponse = {
  success: boolean;
  data: {
    email: string;
    token: string;
  };
};

type DeleteAccountResponse = {
  success: boolean;
};

export async function loginUser(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<string> {
  const response = await request.post(endpoints.login, {
    data: {
      email,
      password
    }
  });

  const jsonData = (await response.json()) as LoginResponse;

  expect(response.status()).toBe(200);
  expect(jsonData.data.token).toBeTruthy();

  return jsonData.data.token;
}

export async function deleteCurrentUser(
  request: APIRequestContext,
  token: string
): Promise<void> {
  const response = await request.delete(endpoints.deleteAccount, {
    headers: {
      'x-auth-token': token
    }
  });

  const jsonData = (await response.json()) as DeleteAccountResponse;

  expect(
    response.status(),
    `Delete account failed. Response: ${JSON.stringify(jsonData)}`
  ).toBe(200);

  expect(jsonData.success).toBe(true);
}
