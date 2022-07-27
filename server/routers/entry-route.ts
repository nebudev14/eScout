import { Console } from "console";
import { createRouter } from "../create-router";
import { createEntrySchema, getEntrySchema } from "../schemas/entry-schema";

export const entryRouter = createRouter()
  .mutation("create", {
    input: createEntrySchema,
    async resolve({ input, ctx }) {
      console.log("danny was here");
      return await ctx.prisma.entry.create({
        data: {
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
      console.log("danny was also here");
      return await ctx.prisma.entry.findUnique({
        where: { id: input.id },
      });
    },
  });
