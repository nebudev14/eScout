import { z } from "zod";

export const createInviteSchema = z.object({
  id: z.string(),
  team: z.number(),
  userId: z.string(),
});
