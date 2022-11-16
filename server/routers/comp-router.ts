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
  .mutation("delete-comp", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.competition.delete({
        where: { id: input.id }
      })
    }
  }).query("get-by-number", {
    input: z.object({
      team: z.number()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.competition.findMany({
        where: { teamNumber: input.team },
        include: {
          entries: true,
        }
      });
    }
  });
