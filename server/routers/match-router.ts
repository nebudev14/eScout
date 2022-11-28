import { z } from "zod";
import { createRouter } from "../create-router";
import { MatchQuestionType } from "@prisma/client";
import { MatchPromptType } from "@prisma/client";

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
  }).mutation("add-question", {
    input: z.object({
      categoryId: z.string(),
      prompt: z.string(),
      questionType: z.nativeEnum(MatchQuestionType),
      promptType: z.nativeEnum(MatchPromptType)
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormQuestion.create({
        data: {
          matchCategoryId: input.categoryId,
          prompt: input.prompt,
          questionType: input.questionType,
          promptType: input.promptType
        }
      })
    }
  })
  
