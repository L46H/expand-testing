import { test as base } from '@playwright/test';
import { AuthClient } from '../api/clients/auth.client';
import { createUser } from '../api/factories/user.factory';
import type { LoginResponse, RegisterRequest } from '../api/models/auth.models';

type ApiFixtures = {
  authClient: AuthClient;
  newUser: RegisterRequest;
  registeredUser: RegisterRequest;
};

export const test = base.extend<ApiFixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },

  newUser: async ({ authClient }, use) => {
    const user = createUser();

    await use(user);

    const loginResponse = await authClient.login({
      email: user.email,
      password: user.password
    });

    if (loginResponse.ok()) {
      const loginData = (await loginResponse.json()) as LoginResponse;

      await authClient.deleteCurrentUser(loginData.data.token);
    }
  },

  registeredUser: async ({ authClient, newUser }, use) => {
    const response = await authClient.register(newUser);

    if (response.status() !== 201) {
      throw new Error(
        `Failed to create registered user. Status: ${response.status()}`
      );
    }

    await use(newUser);
  }
});

export { expect } from '@playwright/test';
