import { resolve } from "path";
import { createRouter } from "../create-router";
import { createInviteSchema } from "../schemas/invite-schema";

export const inviteRouter = createRouter()
    .mutation("create", {
        input: createInviteSchema,
        async resolve({ input, ctx }) {
            return await ctx.prisma.invite.create({
                data: {
                    teamNumber: input.team,
                    userId: input.userId
                }
            })
        }
    });