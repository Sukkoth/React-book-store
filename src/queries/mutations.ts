import { LOGIN, LoginCredentials, LoginResponse } from "@/services/authService";
import { ADD_BOOK, ADD_RENT_BOOK } from "@/services/ownerServices/booksService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLogin() {
  return useMutation<
    LoginResponse,
    AxiosError<{ code?: number; message?: string }>,
    LoginCredentials
  >({
    mutationFn: LOGIN,
    mutationKey: ["login"],
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
