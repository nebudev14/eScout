import { resolve } from "path/posix";
import { createRouter } from "../create-router";
import { createTeamSchema, getTeamsByUser, getTeamSchema } from "../schemas/team-schemas";

export const teamRouter = createRouter()
  .mutation("create", {
    input: createTeamSchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.create({
        data: {
          name: input.name,
          number: input.number,
          creatorId: ctx.session!.user.id,
          members: {
            connect: {
              id: ctx.session!.user.id,
            },
          },
        },
      });
    },
  })
  .query("get-by-id", {
    input: getTeamSchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.findUnique({
        where: { number: input.number },
        select: {
          name: true,
          creator: true,
          members: true,
        },
      });
    },
  })
  .query("get-by-userid", {
    input: getTeamsByUser,
    async resolve({ input, ctx }) {
      return await ctx.prisma.team.findUnique({
        where: { creatorId: input.userId }
      })
    }
  });
