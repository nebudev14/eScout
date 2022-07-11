import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
});

export const getUserSchema = z.object({
  userId: z.string(),
});
