import { Owner } from "./GlobalTypes";

export interface CategoryStatsResponse {
  code: number | string;
  count: CategoryStatItem[];
}

export interface CategoryStatItem {
  category: {
    id: number;
    name: string;
  };
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  authorName: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  info?: BookRent;
}

export interface BookRent {
  id: number;
  quantity: number;
  price: number;
  cover: string;
  bookId: number;
  ownerId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookInfo?: Book;
  owner?: Owner;
}

export interface BooksListResponse {
  books: Book[];
  code: number;
  count: number;
  pagination: {
    totalPages: number;
    pageSize: number;
  };
}

export interface AddBookRentResponse {
  code: number;
  message: string;
  book: BookRent;
}

export interface GetBooksRentResponse {
  code: number;
  books: BookRent[];
  count: number;
  pagination: {
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}
