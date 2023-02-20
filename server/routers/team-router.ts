import { createRouter } from "../create-router";
import { createTeamSchema } from "../schemas/team-schemas";
import { MemberStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import { z } from "zod";1

export const teamRouter = createRouter()
  .mutation("create", {
    input: createTeamSchema,
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation("accept-invite", {
    input: z.object({
      inviteId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.update({
        where: {
          inviteId: input.inviteId,
        },
        data: {
          members: {
            create: {
              userId: ctx.session!.user.id,
              status: MemberStatus.MEMBER,
            },
          },
        },
      });
    },
  })
  .mutation("remove-member", {
    input: z.object({
      teamId: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.update({
        where: { id: input.teamId },
        data: {
          members: {
            delete: {
              userId_teamId: {
                userId: input.userId,
                teamId: input.teamId
              }
            },
          },
        },
      });
    },
  })
  .mutation("promote-member", {
    input: z.object({
      teamId: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.update({
        where: { id: input.teamId },
        data: {
          members: {
            update: {
              where: {
                userId_teamId: {
                  userId: input.userId,
                  teamId: input.teamId
                }
              },
              data: {
                status: MemberStatus.CREATOR,
              },
            },
          },
        },
      });
    },
  })
  .mutation("regen-id", {
    input: z.object({
      teamId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.update({
        where: { id: input.teamId },
        data: {
          inviteId: nanoid(6),
        }
      })
    }
  })
  .query("get-by-id", {
    input: z.object({
      teamId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.findUnique({
        where: { id: input.teamId },
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
                  questions: true
                }
              }
            }
          }
        },
      });
    },
  });
