import { Owner } from "@/Types/GlobalTypes";
import axios from "@/utils/axios";

export const LOGIN_OWNER = async (
  credentials: LoginCredentials
): Promise<LoginOwnerResponse> => {
  const response = await axios.post<LoginOwnerResponse>(
    "/auth/login",
    credentials
  );
  return response.data;
};

export interface LoginOwnerResponse {
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
