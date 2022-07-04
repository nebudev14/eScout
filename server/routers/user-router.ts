import { createRouter } from "../create-router";
import { z } from "zod";


export const userRouter = createRouter()
    .query("get-by-id", {
        input: z.object({
            userId: z.string().uuid()
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.user.findUnique({
                where: { id: input.userId },
                include: {
                    teamsCreated: true,
                    teamsJoined: true
                }
            })
        }
    });