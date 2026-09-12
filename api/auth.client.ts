import { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../constants/endpoints';

type LoginRequest = {
  email: string;
  password: string;
};

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async login(data: Partial<LoginRequest>): Promise<APIResponse> {
    return this.request.post(endpoints.login, {
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
