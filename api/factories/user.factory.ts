import type { RegisterRequest } from '../models/auth.models';
import registerData from '../../data/api/register.data.json';

export function createUser(): RegisterRequest {
  const timestamp = Date.now();

  return {
    name: `user${timestamp}`,
    email: `user${timestamp}@example.com`,
    password: registerData.validRegister.password
  };
}
