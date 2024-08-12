import { AddBookSchema, AddRentBookSchema } from "@/schemas/owner";
import { AddBookRentResponse, Book, GetBooksRentResponse } from "@/Types/types";
import axios from "@/utils/axios";

export async function ADD_BOOK(formData: AddBookSchema) {
  const res = await axios.post<AddBookResponse>("/books", formData);
  return res.data.books;
}

interface AddBookResponse {
  code: number;
  message?: string;
  books: Book[];
}

export async function ADD_RENT_BOOK(formData: AddRentBookSchema) {
  const res = await axios.post<AddBookRentResponse>("/owners/books", formData);
  return res.data.book;
}

export async function GET_RENT_BOOKS({ forAdmin }: { forAdmin: boolean }) {
  const res = await axios.get<GetBooksRentResponse>(
    `/${forAdmin ? "admins" : "owners"}/books`
  );
  return res.data.books;
}
