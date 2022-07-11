import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string(),
    number: z.number(), 
});

export const getTeamSchema = z.object({
    number: z.number()
})

export const getTeamsByUser = z.object({
    userId: z.string().uuid()
})