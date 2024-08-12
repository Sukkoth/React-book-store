import {
  Book,
  BooksListResponse,
  Category,
  CategoryStatsResponse,
} from "@/Types/types";
import axios from "@/utils/axios";

/**@description get category count by books */
export async function GET_CATEGORY_STATS() {
  const res = await axios("/categories/countBooks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return (res.data as CategoryStatsResponse).count;
}

interface CategoryResponse {
  code: number | string;
  categories: Category[];
}

/**@description get categories */
export async function GET_CATEGORIES() {
  const res = await axios("/categories");
  return (res.data as CategoryResponse).categories;
}

export async function GET_BOOKS_LIST({ name }: { name?: string }) {
  const res = await axios<BooksListResponse>(
    `/books?${name ? `name=${name}` : ""}`
  );
  return res.data;
}
