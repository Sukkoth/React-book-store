import {
  LOGIN,
  LoginCredentials,
  LoginResponse,
  SIGNUP,
} from "@/services/authService";
import { ADD_BOOK, ADD_RENT_BOOK } from "@/services/ownerServices/booksService";
import {
  APPROVE_OWNER,
  APPROVE_RENT_BOOK,
  DELETE_OWNER,
  DELETE_RENT_BOOK,
} from "@/services/services";
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

export function useDeleteRentBook() {
  return useMutation({
    mutationFn: DELETE_RENT_BOOK,
    mutationKey: ["deleteRentBook"],
  });
}

export function useDeleteOwner() {
  return useMutation({
    mutationFn: DELETE_OWNER,
    mutationKey: ["deleteOwner"],
  });
}

export function useApproveRentBook() {
  return useMutation({
    mutationFn: APPROVE_RENT_BOOK,
    mutationKey: ["updateRentBook"],
  });
}

export function useApproveOwner() {
  return useMutation({
    mutationFn: APPROVE_OWNER,
    mutationKey: ["approveOwner"],
  });
}
