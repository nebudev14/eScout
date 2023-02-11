import { z } from "zod";
import { createRouter } from "../create-router";
import { MatchQuestionType } from "@prisma/client";
import { MatchPromptType } from "@prisma/client";
import { inputs } from "../../components/scouting/filter/dynamic-input";

export const matchRouter = createRouter()
  .mutation("create-form", {
    input: z.object({
      name: z.string(),
      teamId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchForm.create({
        data: {
          name: input.name,
          teamId: input.teamId,
        },
      });
    },
  })
  .mutation("create-category", {
    input: z.object({
      matchFormId: z.string(),
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormCategory.create({
        data: {
          matchFormId: input.matchFormId,
          name: input.name,
        },
      });
    },
  })
  .mutation("delete-category", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormCategory.delete({
        where: { id: input.id },
      });
    },
  })
  .mutation("add-question", {
    input: z.object({
      categoryId: z.string(),
      prompt: z.string(),
      questionType: z.nativeEnum(MatchQuestionType),
      promptType: z.nativeEnum(MatchPromptType),
      options: z.array(z.string())
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormQuestion.create({
        data: {
          matchCategoryId: input.categoryId,
          prompt: input.prompt,
          questionType: input.questionType,
          promptType: input.promptType,
          options: input.options
        },
      });
    },
  })
  .mutation("add-response", {
    input: z.object({
      id: z.string(),
      teamId: z.string(),
      compId: z.string(),
      prescout: z.boolean(),
      video: z.string(),
      questionId: z.string()

    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchFormResponse.create({
        data: {
          userId: input.id,
          teamId: input.teamId,
          compId: input.compId,
          prescout: input.prescout,
          video: input.video,
          questionId: input.questionId,
        }
      })
    }
  })
  .query("get-by-team-id", {
    input: z.object({
      teamId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchForm.findMany({
        where: {
          teamId: input.teamId,
        },
        include: {
          categories: {
            include: {
              questions: true,
            },
          },
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.matchForm.findUnique({
        where: { id: input.id },
        include: {
          categories: {
            include: { questions: true },
          },
        },
      });
    },
  });
