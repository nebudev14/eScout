import { MemberStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authProcedure } from "./auth";

export const entityId = z.object({
  entityId: z.string().cuid()
})

// Check if request is from a team admin
export const assertTeamAdmin = authProcedure.use(
  async ({ ctx, rawInput, next }) => {
    const result = entityId.safeParse(rawInput)
    if (!result.success) throw new TRPCError({ code: "BAD_REQUEST" })

    const team = await ctx.prisma.team.findUnique({
      where: { id: result.data.entityId },
      include: { members: true }
    })

    const user = team?.members.filter((e) => e.userId === ctx.session.user.id);

    if (!team || !user || user[0].status !== MemberStatus.CREATOR) {
      throw new TRPCError({
        message: "You are not an admin of this team.",
        code: "FORBIDDEN"
      })
    }

    return next({ ctx: { team: team } });
  }
)

// Check if form action request is from a member who is an admin of the team that owns the form (this makes so much sense)
export const assertFormAdmin = authProcedure.use(
  async ({ ctx, rawInput, next }) => {
    const result = entityId.safeParse(rawInput)
    if (!result.success) throw new TRPCError({ code: "BAD_REQUEST" })

    const form = await ctx.prisma.matchForm.findUnique({
      where: { id: result.data.entityId },
      include: { team: { include: { members: true } } }
    })

    const user = form?.team.members.filter((e) => e.userId === ctx.session.user.id);
    if (!form || !user || user[0].status !== MemberStatus.CREATOR) {
      throw new TRPCError({
        message: "You are not an admin of this team.",
        code: "FORBIDDEN"
      })
    }

    return next({ ctx: { form: form } });
  }
)