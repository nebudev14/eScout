import { Prisma } from "@prisma/client";
import { object, z } from "zod";
import { createRouter } from "../create-router";
import { createEntrySchema, filterEntrySchema, getEntrySchema } from "../schemas/entry-schema";


export const entryRouter = createRouter()
  .mutation("create", {
    input: createEntrySchema,
    async resolve({ input, ctx }) {
      console.log("danny was here");
      return await ctx.prisma.entry.create({
        data: {
          userId: input.userId,
          competitionName: input.competitionName,
          teamNumber: input.teamNumber,
          
          entryTeamNumber: input.entryTeamNumber,
          matchNumber: input.matchNumber,
          matchType: input.matchType,
          eventName: input.eventName,

          mobility: input.mobility,

          autoHighShotsMade: input.autoHighShotsMade,
          autoHighShotsTotal: input.autoHighShotsTotal,
          autoLowShotsMade: input.autoLowShotsMade,
          autoLowShotsTotal: input.autoLowShotsTotal,

          teleopHighShotsMade: input.teleopHighShotsMade,
          teleopHighShotsTotal: input.teleopHighShotsTotal,
          teleopLowShotsMade: input.teleopLowShotsMade,
          teleopLowShotsTotal: input.teleopLowShotsTotal,

          climbStart: input.climbStart,
          climbEnd: input.climbEnd,
          climbRung: input.climbRung,

          defended: input.defended,
          defendedBy: input.defendedBy,

          comments: input.comments,
        },
      });
    },
  })
  .query("get-by-id", {
    input: getEntrySchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.entry.findUnique({
        where: { id: input.id },
      });
    },
  }).query("get-by-team", { 
    input: z.object({
      teamNumber: z.number()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.entry.findMany({
        where: { teamNumber: input.teamNumber }
      })
    }
  }).query("get-by-filter", {
    input: filterEntrySchema,
    async resolve({ input, ctx }) {
      const filteredQuery = Prisma.validator<Prisma.EntryWhereInput>()(input);
      return await ctx.prisma.entry.findMany({
        where: {
          ...filteredQuery
        }
      })
    }
  });
