import { boolean, z } from "zod";

export const loginValidation = z.object({
  email: z.string().min(6, "This field is required").email(),
  password: z.string().min(6, "This field is required"),
});

export type LoginSchema = z.infer<typeof loginValidation>;

export const signupValidation = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    location: z.string(),
    phone: z
      .string()
      .length(10, "Phone length must be 10")
      .regex(/^(09|07)/, "String must start with '09' or '07'"),
    acceptTerms: z.boolean(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type SignupSchema = z.infer<typeof signupValidation>;
