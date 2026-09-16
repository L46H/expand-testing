import { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../../constants/endpoints';

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = LoginRequest & {
  name: string;
};

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async login(data: Partial<LoginRequest>): Promise<APIResponse> {
    return this.request.post(endpoints.login, {
      data
    });
  }

  async register(data: Partial<RegisterRequest>): Promise<APIResponse> {
    return this.request.post(endpoints.register, {
      data
    });
  }

  async deleteCurrentUser(token: string): Promise<APIResponse> {
    return this.request.delete(endpoints.deleteAccount, {
      headers: {
        'x-auth-token': token
      }
    });
  }
}
