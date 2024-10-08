import { Owner, Users } from "./GlobalTypes";

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
  category?: Category;
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
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  bookInfo?: Book;
  owner?: Owner;
  category?: Category[];
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

export interface Rentals {
  id: number;
  bookId: number;
  userId: number;
  dueDate: Date;
  returnedAt: Date;
  createdAt: Date;
  updatedAt: Date | null;
  book: OwnerToBooks; // Relation
  user: Users; // Relation
}

export interface OwnerToBooks {
  id: number;
  quantity: number;
  price: number;
  cover: string;
  bookId: number;
  ownerId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  bookInfo: Book; // Relation
  owners: Owner; // Relation
  rentals?: Rentals[]; // Relation
}

export interface GetOwnersResponse {
  code: number;
  owners: Owner[];
  count: number;
  pagination: {
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}

export interface Wallets {
  id: number;
  userId: number;
  balance: number;
  createdAt: Date;
  status: string;
  cratedAt: Date;
  updatedAt: Date | null;
  owner: Owner; // Relation
}

export interface Transaction {
  id: number;
  amount: number;
  createdAt: string;
  userId: number;
  rentalId: number;
}

export interface Wallet {
  id: number;
  ownerId: number;
  balance: number;
  createdAt: string;
  status: string;
  updatedAt: string;
}

export interface WalletTransactions {
  wallet: Wallet;
  transactions: Transaction[];
}
