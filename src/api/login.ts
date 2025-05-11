import { api } from "./index";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
  result: {
    accessToken: string;
    role: string[];
  };
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/token", credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout", {}, { withCredentials: true });
};

interface RegisterRequest {
  fullName: string,
  email: string,
  password: string,
  retypePassword: string,
  dateOfBirth: string,
}

interface RegisterResponse {
  code: number;
  result: string;
}
export const register = async (
  credentials: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/users/pre-register", credentials, {
    withCredentials: true,
  });
  return response.data;
};

interface VerifyRegisterRequest {
  otp: string;
  encryptedData: string;
}

interface VerifyRegisterResponse {
  code: number;
  result: {
    id: string;
    fullName: string;
    email: string;
    dateOfBirth: string;
    imageUrl: string;
    balance: number;
  };
}

export const verifyRegister = async (
  credentials: VerifyRegisterRequest
): Promise<VerifyRegisterResponse> => {
  const response = await api.post<VerifyRegisterResponse>("/users/confirm-register", credentials, {
    withCredentials: true,
  });
  return response.data;
};
