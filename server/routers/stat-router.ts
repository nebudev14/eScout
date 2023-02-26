import { z } from "zod";
import { assertAdmin } from "@server/middleware/is-admin";
import { LEVEL } from "types/misc-types";
import { authProcedure } from "@server/middleware/auth";
import { entityId } from "types/misc-types";
import { router } from "../trpc";
import { ProfileType, Operation } from "@prisma/client";
import { assertMember } from "@server/middleware/is-member";

export const statRouter = router({
  createProfile: assertAdmin(LEVEL.MATCH_FORM)
    .input(
      entityId.extend({ name: z.string(), type: z.nativeEnum(ProfileType) })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.statProfile.create({
        data: {
          matchFormId: input.entityId,
          name: input.name,
          type: input.type,
        },
      });
    }),

  addStatistic: assertAdmin(LEVEL.STATISTIC_PROFILE)
    .input(
      entityId.extend({
        name: z.string(),
        operation: z.nativeEnum(Operation),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.statistic.create({
        data: {
          statProfileId: input.entityId,
          name: input.name,
          operation: input.operation,
          categoryId: input.categoryId,
        },
      });
    }),

  deleteStatistic: assertAdmin(LEVEL.STATISTIC)
    .input(entityId)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.statistic.delete({
        where: { id: input.entityId },
      });
    }),

  getProfilesByTeam: assertMember(LEVEL.MATCH_FORM)
    .input(entityId)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.statProfile.findMany({
        where: { matchFormId: input.entityId },
      });
    }),
});
