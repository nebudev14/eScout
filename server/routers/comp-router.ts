import { z } from "zod";
import { authProcedure } from "../middleware/auth";
import { assertAdmin, entityId } from "../middleware/is-admin";
import { LEVEL } from "../../types/misc-types";
import { router } from "../trpc"

export const compRouter = router({
  createComp: assertAdmin(LEVEL.TEAM).input(entityId.extend({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.competition.create({
        data: {
          name: input.name,
          teamId: input.entityId
        }
      })
    }),

  deleteComp: assertAdmin(LEVEL.TEAM).input(entityId.extend({ name: z.string() }))
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

