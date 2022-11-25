import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string(),
    number: z.number(), 
});