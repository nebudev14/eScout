import { entityId, LEVEL } from "../../types/misc-types";
import { authProcedure } from "./auth";
import { TRPCError } from "@trpc/server";

export const assertMember = (level: LEVEL) => {
  return authProcedure.use(async ({ ctx, rawInput, next }) => {
    const result = entityId.safeParse(rawInput);
    if (!result.success) throw new TRPCError({ code: "BAD_REQUEST" });
    let fetchedResult;

    switch (level) {
      case LEVEL.TEAM:
        fetchedResult = await ctx.prisma.team.findFirst({
          where: {
            id: result.data.entityId, members: {
              some: {
                userId: ctx.session.user.id
              }
            }
          },
        })
        break;
    }

    if (!fetchedResult) {
      throw new TRPCError({
        message: "You are not in this team.",
        code: "FORBIDDEN"
      });
    }

    return next({ ctx: { result: fetchedResult } })

  })
}