import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name should be at least 2 character")
      .max(50),
    lastName: z
      .string()
      .min(2, "First name should be at least 2 character")
      .max(50),
    email: z.string(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters"),
  })
  .refine(
    (data) => {
      if (data.password === data.confirmPassword) {
        return true;
      }
    },
    { message: "Password to not match", path: ["confirmPassword"] }
  )
  .refine(
    (data) => {
      if (data.email.includes("@")) {
        return true;
      }
    },
    {
      message: "Email is not a valid email",
      path: ["email"],
    }
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
});
