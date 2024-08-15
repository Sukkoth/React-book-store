import { useAuth } from "@/Providers/AuthProvider";
import { GET_RENT_BOOKS } from "@/services/ownerServices/booksService";
import {
  GET_BALANCE,
  GET_BOOKS_LIST,
  GET_CATEGORIES,
  GET_CATEGORY_STATS,
} from "@/services/services";
import {
  BookRent,
  BooksListResponse,
  Category,
  CategoryStatItem,
} from "@/Types/types";
import { useQuery } from "@tanstack/react-query";

export function useCategoryStats() {
  return useQuery<CategoryStatItem[]>({
    queryKey: ["categoryStats"],
    queryFn: GET_CATEGORY_STATS,
    staleTime: 7200, //every 2 hrs
  });
}

export function useGetCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: GET_CATEGORIES,
    staleTime: 7200, //every 2 hrs
  });
}

export function useGetBooksList({ name }: { name?: string }) {
  return useQuery<BooksListResponse>({
    queryKey: ["booksList"],
    queryFn: () => GET_BOOKS_LIST({ name }),
  });
}

export function useGetBooksRentList({ forAdmin }: { forAdmin: boolean }) {
  return useQuery<BookRent[]>({
    queryKey: ["booksList"],
    queryFn: () => GET_RENT_BOOKS({ forAdmin }),
  });
}

export function useGetBalance() {
  const { userType } = useAuth();
  return useQuery({
    queryKey: ["balance", userType],
    queryFn: () => GET_BALANCE(userType!),
  });
}
