import { createRouter } from "../create-router";
import { createTeamSchema, getTeamSchema } from "../schemas/team-schemas";
import { MemberStatus } from "@prisma/client";
import { nanoid } from "nanoid";

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
                status: MemberStatus.CREATOR    
            }
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
        include: {
          members: true
        }
      });
    },
  });
