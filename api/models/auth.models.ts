export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  name: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    email: string;
    token: string;
  };
};

export type RegisterResponse = {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
  };
};

export type ErrorResponse = {
  success: boolean;
};
