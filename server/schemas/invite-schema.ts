import { z } from "zod";

export const createInviteSchema = z.object({
  team: z.number(),
  userId: z.string(),
});

export const acceptInviteSchema = z.object({
  id: z.string(),
  team: z.number(),
  userId: z.string()
})