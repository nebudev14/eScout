import { PitQuestionType } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../create-router";

export const pitRouter = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      team: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.create({
        data: {
          name: input.name,
          teamNumber: input.team,
        },
      });
    },
  })
  .mutation("add-question", {
    input: z.object({
      id: z.string(),
      prompt: z.string(),
      type: z.nativeEnum(PitQuestionType),
      possibleResponses: z.string().array(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.update({
        where: { id: input.id },
        data: {
          questions: {
            create: {
              prompt: input.prompt,
              type: input.type,
              possibleResponses: input.possibleResponses,
            },
          },
        },
      });
    },
  })
  .mutation("delete-question", {
    input: z.object({
      id: z.string(),
      questionId: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.update({
        where: { id: input.id },
        data: {
          questions: {
            delete: {
              id: input.questionId
            }
          }
        }
      })
    }
  })
  .mutation("submit-scout", {
    input: z.object({
      data: z.object({
        pitQuestionId: z.string(),
        response: z.string(),
        userId: z.string(),
        entryTeamNumber: z.number(),
      }).array()
    }), 
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitResponse.createMany({
        data: input.data
      })
    }
  })
  .query("get-by-number", {
    input: z.object({
      team: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.findMany({
        where: { teamNumber: input.team },
        include: {
          questions: true,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.pitForm.findUnique({
        where: { id: input.id },
        include: {
          questions: true,
        },
      });
    },
  });
