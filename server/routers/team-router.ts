import { createRouter } from "../create-router";
import { createTeamSchema } from "../schemas/team-schemas";

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
                            id: ctx.session!.user.id
                        }
                    }
                }
            })
        }
    })