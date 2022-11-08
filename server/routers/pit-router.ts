import { z } from "zod";
import { createRouter } from "../create-router";

export const pitRouter = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      team: z.number()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.create({
        data: {
          name: input.name,
          teamNumber: input.team
        }
      })
    }
  })
  .query("get-by-number", {
    input: z.object({
      team: z.number()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.findMany({
        where: { teamNumber: input.team },
        include: {
          questions: true,
          responses: true
        }
      })
    }
  })
