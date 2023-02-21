import { z } from "zod";
import { router } from "../trpc"

export const compRouter = router({
  createComp: 
})

export const comp = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      teamId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.competition.create({
        data: {
          name: input.name,
          teamId: input.teamId
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
  }).query("get-by-team-id", {
    input: z.object({
      teamId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.competition.findMany({
        where: { teamId: input.teamId },
        include: {
          entries: true,
        }
      });
    }
  });
