import {
  LOGIN,
  LoginCredentials,
  LoginResponse,
  SIGNUP,
} from "@/services/authService";
import { ADD_BOOK, ADD_RENT_BOOK } from "@/services/ownerServices/booksService";
import { ServerFormErrorResponse } from "@/utils/parseServerFormError";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLogin() {
  return useMutation<LoginResponse, AxiosError, LoginCredentials>({
    mutationFn: LOGIN,
    mutationKey: ["login"],
  });
}

export function useSignup() {
  return useMutation<
    LoginResponse,
    AxiosError<ServerFormErrorResponse>,
    LoginCredentials
  >({
    mutationFn: SIGNUP,
    mutationKey: ["signup"],
  });
}

export function useAddBook() {
  return useMutation({
    mutationFn: ADD_BOOK,
    mutationKey: ["addBook"],
  });
}

export function useAddRentBook() {
  return useMutation({
    mutationFn: ADD_RENT_BOOK,
    mutationKey: ["addRentBook"],
  });
}
