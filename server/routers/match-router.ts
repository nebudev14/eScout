import { z } from "zod";
import { createRouter } from "../create-router";

export const matchRouter = createRouter()
  .mutation("create-form", {
    input: z.object({
      name: z.string(),
      teamId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchForm.create({
        data: {
          name: input.name,
          teamId: input.teamId
        }
      })
    }
  })
  .mutation("create-category", {
    input: z.object({
      matchFormId: z.string(),
      name: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormCategory.create({
        data: {
          matchFormId: input.matchFormId,
          name: input.name
        }
      })
    }
  })
