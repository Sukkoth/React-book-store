import {
  LOGIN_OWNER,
  LoginCredentials,
  LoginOwnerResponse,
} from "@/services/authService";
import { ADD_BOOK, ADD_RENT_BOOK } from "@/services/ownerServices/booksService";
import { useMutation } from "@tanstack/react-query";

export function useOwnerLogin() {
  return useMutation<LoginOwnerResponse, Error, LoginCredentials>({
    mutationFn: LOGIN_OWNER,
    mutationKey: ["login", "owner"],
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
