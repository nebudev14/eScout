import { PitQuestionType } from "@prisma/client";
import { z } from "zod";
import { entityId, LEVEL } from "../../types/misc-types";
import { createRouter } from "../create-router";
import { authProcedure } from "../middleware/auth";
import { assertAdmin } from "../middleware/is-admin";
import { assertMember } from "../middleware/is-member";
import { router } from "../trpc";

export const pitRouter = router({
  createPitForm: assertAdmin(LEVEL.TEAM)
    .input(entityId.extend({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.pitForm.create({
        data: {
          name: input.name,
          teamId: input.entityId
        }
      })
    }),

  addPitQuestion: assertAdmin(LEVEL.PIT_FORM)
    .input(entityId.extend({ prompt: z.string(), type: z.nativeEnum(PitQuestionType), possibleResponses: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.pitForm.update({
        where: { id: input.entityId },
        data: {
          questions: {
            create: {
              prompt: input.prompt,
              type: input.type,
              possibleResponses: input.possibleResponses,
            },
          },
        },
      })
    }),

  deletePitQuestion: assertAdmin(LEVEL.PIT_QUESTION).input(entityId)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.pitQuestion.delete({
        where: { id: input.entityId }
      })
    }),

  submitPitScout: assertMember(LEVEL.PIT_FORM).input(entityId.extend({
    data: z.object({
      pitQuestionId: z.string(),
      response: z.string(),
      userId: z.string(),
      entryTeamNumber: z.number(),
    }).array()
  }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.pitResponse.createMany({
        data: input.data
      })
    }),

  getByTeamId: assertMember(LEVEL.TEAM).input(entityId)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.pitForm.findMany({
        where: { teamId: input.entityId },
        include: {
          questions: true,
        },
      })
    }),

  getById: authProcedure.input(entityId)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.pitForm.findUnique({
        where: { id: input.entityId },
        include: {
          questions: {
            include: {
              PitResponse: true
            }
          },
          team: {
            select: {
              number: true
            }
          }
        },
      })
    })
})
