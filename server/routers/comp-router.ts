import { z } from "zod";
import { authProcedure } from "../middleware/auth";
import { assertTeamAdmin, entityId } from "../middleware/is-admin";
import { router } from "../trpc"

export const compRouter = router({
  createComp: assertTeamAdmin.input(entityId.extend({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.competition.create({
        data: {
          name: input.name,
          teamId: input.entityId
        }
      })
    }),

  deleteComp: assertTeamAdmin.input(entityId.extend({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.competition.delete({
        where: { id: input.entityId }
      })
    }),

  getComp: authProcedure.input(entityId)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.competition.findUnique({
        where: { id: input.entityId }
      })
    })
})

