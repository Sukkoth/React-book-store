import { Owner, User } from "@/Types/GlobalTypes";
import axios from "@/utils/axios";

export const LOGIN = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

export const SIGNUP = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "/auth/register",
    credentials
  );
  return response.data;
};

export interface LoginResponse {
  code: number;
  message: string;
  user: Owner;
  token: string;
  userType: string;
}

export interface SignupResponse {
  code: number;
  message: string;
  user: Owner;
  token: string;
  userType: string;
}

// {

//   "user": {
//       "id": "2",
//       "firstName": "Sukkoth",
//       "lastName": "Teklu",
//       "email": "suukootj@gmail.commmm",
//       "phone": "092514383112342",
//       "location": "Addis Ababa",
//       "status": "active",
//       "permissions": [
//           "UPDATE_BOOK_STATUS",
//           "UPDATE_OWNER_STATUS",
//           "DELETE_OWNER",
//           "APPROVE_OWNER"
//       ],
//       "createdAt": "2024-08-13T08:18:50.000Z",
//       "updatedAt": "2024-08-13T08:18:50.000Z"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzIzNTM3MTMwLCJleHAiOjE3MjM3OTYzMzB9.e9tm5yWnGMA_UchJa8pvUHUWJkRKXqzB5nvsgA6ohoE",
//   "userType": "admin"
// }

export interface LoginCredentials {
  email: string;
  password: string;
  userType: "admin" | "user" | "owner";
}
