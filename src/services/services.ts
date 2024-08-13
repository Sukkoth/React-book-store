import {
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

//owners can delete books //atleast according to the UI
export async function DELETE_RENT_BOOK({ bookId }: { bookId: number }) {
  const res = await axios.delete(`/owners/books/${bookId}`);
  return res.data;
}

//admins can delete owners
export async function DELETE_OWNER({ ownerId }: { ownerId: number }) {
  const res = await axios.delete(`/admins/owners/${ownerId}`);
  return res.data;
}

//admin only approves books
export async function APPROVE_RENT_BOOK({
  bookId,
  approved,
}: {
  bookId: number;
  approved: "true" | "false";
}) {
  const res = await axios.put(`/admins/books/${bookId}`, { approved });
  return res.data;
}

//admin approves owners
export async function APPROVE_OWNER({
  ownerId,
  approved,
  status,
}: {
  ownerId: number;
  approved?: "true" | "false";
  status?: "active" | "inactive";
}) {
  const res = await axios.put(`/admins/owners/${ownerId}`, {
    approved,
    status,
  });
  return res.data;
}
