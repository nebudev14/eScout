import { z } from "zod";
import { assertAdmin } from "@server/middleware/is-admin";
import { LEVEL } from "types/misc-types";
import { authProcedure } from "@server/middleware/auth";
import { entityId } from "types/misc-types";
import { router } from "../trpc";
import { ProfileType } from "@prisma/client";

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

  addStatistic: assertAdmin()

});
