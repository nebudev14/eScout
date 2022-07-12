import { resolve } from "path";
import { createRouter } from "../create-router";
import { createInviteSchema, acceptInviteSchema } from "../schemas/invite-schema";

export const inviteRouter = createRouter()
  .mutation("create", {
    input: createInviteSchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.invite.create({
        data: {
          teamNumber: input.team,
          userId: input.userId,
        },
      });
    },
  })
  .mutation("accept", {
    input: acceptInviteSchema,
    async resolve({ input, ctx }) {
      await ctx.prisma.team.update({
        where: { number: input.team },
        data: {
          members: {
            create: {
              id: input.userId
            },
          },
        },
      });
      
      await ctx.prisma.invite.delete({
        where: { id: input.id }
      });
    },
  });
