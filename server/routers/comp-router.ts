import { z } from "zod";
import { createRouter } from "../create-router";

export const compRouter = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      team: z.number()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.competition.create({
        data: {
          name: input.name,
          teamNumber: input.team
        }
      })
    }
  })