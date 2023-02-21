import { MemberStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authProcedure } from "./auth";

export const entityId = z.object({
  entityId: z.string().cuid()
})

export const assertTeamAdmin = authProcedure.use(
  async ({ ctx, rawInput, next }) => {
    const result = entityId.safeParse(rawInput)
    if(!result.success) throw new TRPCError({ code: "BAD_REQUEST" })

    const team = await ctx.prisma.team.findUnique({
      where: { id: result.data.entityId },
      include: { members: true }
    })

    const user = team?.members.filter((e) => e.userId === ctx.session.user.id);

    if(!team || !user || user[0].status !== MemberStatus.CREATOR) {
      throw new TRPCError({
        message: "You are not an admin of this team.",
        code: "FORBIDDEN"
      })
    }

    return next({ ctx: { team: team } });
  }
)