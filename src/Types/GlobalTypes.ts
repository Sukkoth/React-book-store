import { AppAbility } from "@/utils/permissions";
import { RawRuleOf } from "@casl/ability";

export type Admin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  role: {
    id: number;
    name: string;
    permissions: RawRuleOf<AppAbility>[];
  };
  createdAt: Date;
  updatedAt: Date | null;
};

export type Books = {
  id: number;
  name: string;
  authorName: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date | null;
  info: OwnerToBooks[]; // Relation
  category: Categories; // Relation
};

export type Categories = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  books: Books[]; // Relation
};

export type OwnerToBooks = {
  id: number;
  quantity: number;
  price: number;
  cover: string;
  bookId: number;
  ownerId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  bookInfo: Books; // Relation
  owners: Owner; // Relation
  rentals: Rentals[]; // Relation
};

export type Owner = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  status: string;
  approved: boolean;
  role: {
    id: number;
    name: string;
    permissions: RawRuleOf<AppAbility>[];
  };
  _count?: {
    books: number;
  };
  createdAt: Date;
  updatedAt: Date | null;
  books: OwnerToBooks[]; // Relation
  wallet: Wallets[]; // Relation
};

export type Rentals = {
  id: number;
  bookId: number;
  userId: number;
  dueDate: Date;
  returnedAt: Date;
  createdAt: Date;
  updatedAt: Date | null;
  book: OwnerToBooks; // Relation
  user: Users; // Relation
};

export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  rentals: Rentals[]; // Relation
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  approved: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export type Wallets = {
  id: number;
  userId: number;
  balance: number;
  createdAt: Date;
  status: string;
  cratedAt: Date;
  updatedAt: Date | null;
  owner: Owner; // Relation
};

export type Permissions = {
  id: number;
  for: UserType;
  list: Record<string, unknown>; // JSON field
};

export enum UserType {
  admin = "admin",
  owner = "owner",
  user = "user",
}
