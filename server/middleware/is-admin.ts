import { MemberStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { entityId } from "../../types/misc-types";
import { authProcedure } from "./auth";
import { LEVEL } from "../../types/misc-types";


export const assertAdmin = (level: LEVEL) => {
  return authProcedure.use(async ({ ctx, rawInput, next }) => {
    const result = entityId.safeParse(rawInput);
    if (!result.success) throw new TRPCError({ code: "BAD_REQUEST" });

    let fetchedResult;

    switch (level) {
      case LEVEL.TEAM:
        fetchedResult = await ctx.prisma.team.findUnique({
          where: { id: result.data.entityId },
          include: { members: true },
        });
        break;

      case LEVEL.MATCH_FORM:
        fetchedResult = await ctx.prisma.matchForm.findUnique({
          where: { id: result.data.entityId },
          include: { team: { include: { members: true } } },
        });
        fetchedResult = fetchedResult?.team;
        break;

      case LEVEL.MATCH_CATEGORY:
        fetchedResult = await ctx.prisma.matchFormCategory.findUnique({
          where: { id: result.data.entityId },
          include: {
            matchForm: { include: { team: { include: { members: true } } } },
          },
        });
        fetchedResult = fetchedResult?.matchForm.team;
        break;

      case LEVEL.MATCH_QUESTION:
        fetchedResult = await ctx.prisma.matchFormQuestion.findUnique({
          where: { id: result.data.entityId },
          include: {
            matchCategory: {
              include: {
                matchForm: {
                  include: { team: { include: { members: true } } },
                },
              },
            },
          }, // this is awful
        });
        fetchedResult = fetchedResult?.matchCategory?.matchForm?.team;
        break;

      case LEVEL.MATCH_RESPONSE:
        fetchedResult = await ctx.prisma.matchFormResponse.findUnique({
          where: { id: result.data.entityId },
          include: { form: { include: { team: { include: { members: true } } } } }
        })
        fetchedResult = fetchedResult?.form.team;
        break;

      case LEVEL.PIT_FORM:
        fetchedResult = await ctx.prisma.pitForm.findUnique({
          where: { id: result.data.entityId },
          include: { team: { include: { members: true } } },
        });
        fetchedResult = fetchedResult?.team;
        break;

      case LEVEL.PIT_QUESTION:
        fetchedResult = await ctx.prisma.pitQuestion.findUnique({
          where: { id: result.data.entityId },
          include: {
            pitForm: { include: { team: { include: { members: true } } } },
          },
        });
        fetchedResult = fetchedResult?.pitForm.team;
        break;
    }

    const user = fetchedResult?.members.filter(
      (e) => e.userId === ctx.session.user.id
    );

    if (!fetchedResult || !user || user[0].status !== MemberStatus.CREATOR) {
      throw new TRPCError({
        message: "You are not an admin of this team.",
        code: "FORBIDDEN",
      });
    }

    return next({ ctx: { result: fetchedResult } });
  });
};
