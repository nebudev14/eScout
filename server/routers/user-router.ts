import { createRouter } from "../create-router";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("create", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      image: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.create({
        data: {
          id: input.id,
          name: input.name,
          email: input.email,
          image: input.image,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      userId: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: {
          teamsCreated: true,
          teamsJoined: true,
        },
      });
    },
  });
