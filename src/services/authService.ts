import { Owner } from "@/Types/GlobalTypes";
import axios from "@/utils/axios";

export const LOGIN = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

export interface LoginResponse {
  code: number;
  message: string;
  user: Owner;
  token: string;
  userType: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: "admin" | "user" | "owner";
}
