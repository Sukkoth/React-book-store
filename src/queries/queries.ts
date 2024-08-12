import {
  GET_BOOKS_LIST,
  GET_CATEGORIES,
  GET_CATEGORY_STATS,
} from "@/services/services";
import { BooksListResponse, Category, CategoryStatItem } from "@/Types/types";
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
