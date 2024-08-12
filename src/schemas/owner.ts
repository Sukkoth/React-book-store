import { z } from "zod";

export const addBookValidation = z.object({
  name: z.string().min(1, "This field is required"),

  authorName: z.string().min(1, "This field is required"),
  categoryId: z.string({
    required_error: "This field is required",
  }),
});

export type AddBookSchema = z.infer<typeof addBookValidation>;

export const addBookForRent = z.object({
  bookId: z.number().min(1),
  quantity: z.string().min(1),
  price: z.string().min(1),
  cover: z.string().min(1),
});

export type AddRentBookSchema = z.infer<typeof addBookForRent>;
