import { MemberStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { z } from "zod";
import { router } from "../trpc";
import { authProcedure } from "../middleware/auth";
import { assertAdmin } from "../middleware/is-admin";
import { entityId, LEVEL } from "../../types/misc-types";

export const teamRouter = router({
  createTeam: authProcedure
    .input(z.object({ name: z.string(), number: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.create({
        data: {
          name: input.name,
          number: input.number,
          inviteId: nanoid(6),
          members: {
            create: {
              userId: ctx.session!.user.id,
              status: MemberStatus.CREATOR,
            },
          },
        },
      });
    }),

  acceptInvite: authProcedure
    .input(z.object({ inviteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.update({
        where: { inviteId: input.inviteId },
        data: {
          members: {
            create: {
              userId: ctx.session!.user.id,
              status: MemberStatus.MEMBER,
            },
          },
        },
      });
    }),

  removeMember: assertAdmin(LEVEL.TEAM)
    .input(entityId.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.update({
        where: { id: input.entityId },
        data: {
          members: {
            delete: {
              userId_teamId: {
                userId: input.userId,
                teamId: input.entityId,
              },
            },
          },
        },
      });
    }),

  promoteMember: assertAdmin(LEVEL.TEAM)
    .input(entityId.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.update({
        where: { id: input.entityId },
        data: {
          members: {
            update: {
              where: {
                userId_teamId: {
                  userId: input.userId,
                  teamId: input.entityId,
                },
              },
              data: {
                status: MemberStatus.CREATOR,
              },
            },
          },
        },
      });
    }),

  regenId: assertAdmin(LEVEL.TEAM)
    .input(entityId)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.update({
        where: { id: input.entityId },
        data: {
          inviteId: nanoid(6),
        },
      });
    }),

  getById: authProcedure.input(entityId).query(async ({ ctx, input }) => {
    return await ctx.prisma.team.findUnique({
      where: { id: input.entityId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        matchScouts: {
          include: {
            categories: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });
  }),

  getByUser: authProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.teamUser.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
            matchScouts: {
              include: {
                categories: {
                  include: {
                    questions: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }),
});
