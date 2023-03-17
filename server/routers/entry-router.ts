// import { Prisma } from "@prisma/client";
// import { z } from "zod";
// import { createRouter } from "../create-router";
// import {
//   createEntrySchema,
//   filterEntrySchema,
//   getEntrySchema,
// } from "../schemas/entry-schema";

// export const entryRouter = createRouter()
//   .mutation("create", {
//     input: createEntrySchema,
//     async resolve({ input, ctx }) {
//       return await ctx.prisma.entry.create({
//         data: {
//           userId: input.userId,
//           compId: input.competitionId,
//           teamId: input.teamId,
//           compName: input.compName,

//           entryTeamNumber: input.entryTeamNumber,
//           matchNumber: input.matchNumber,
//           matchType: input.matchType,
//           prescout: input.prescout,
//           video: input.videoLink,

//           mobility: input.mobility,

//           autoHighShotsMade: input.autoHighShotsMade,
//           autoHighShotsTotal: input.autoHighShotsTotal,
//           autoLowShotsMade: input.autoLowShotsMade,
//           autoLowShotsTotal: input.autoLowShotsTotal,

//           teleopHighShotsMade: input.teleopHighShotsMade,
//           teleopHighShotsTotal: input.teleopHighShotsTotal,
//           teleopLowShotsMade: input.teleopLowShotsMade,
//           teleopLowShotsTotal: input.teleopLowShotsTotal,

//           climbStart: input.climbStart,
//           climbEnd: input.climbEnd,
//           climbRung: input.climbRung,

//           defended: input.defended,
//           defendedBy: input.defendedBy,

//           comments: input.comments,
//         },
//       });
//     },
//   })
//   .mutation("swap-entry", {
//     input: z.object({
//       id: z.string(),
//       prescout: z.boolean()
//     }),
//     async resolve({ input, ctx }) {
//       return await ctx.prisma.entry.update({
//         where: { id: input.id },
//         data: {
//           prescout: input.prescout
//         }
//       })
//     }
//   })
//   .mutation("delete-entry", {
//     input: z.object({
//       id: z.string(),
//     }),
//     async resolve({ input, ctx }) {
//       return await ctx.prisma.entry.delete({
//         where: { id: input.id },
//       });
//     },
//   })
//   .query("get-by-id", {
//     input: getEntrySchema,
//     async resolve({ input, ctx }) {
//       return await ctx.prisma.entry.findUnique({
//         where: { id: input.id },
//       });
//     },
//   })
//   .query("get-by-team", {
//     input: z.object({
//       teamId: z.string(),
//     }),
//     async resolve({ input, ctx }) {
//       return await ctx.prisma.entry.findMany({
//         where: { teamId: input.teamId },
//       });
//     },
//   })
//   .query("get-by-filter", {
//     input: filterEntrySchema,
//     async resolve({ input, ctx }) {
//       const filteredQuery = Prisma.validator<Prisma.EntryWhereInput>()(
//         input.query
//       );
//       return await ctx.prisma.entry.findMany({
//         where: {
//           teamId: input.teamId,
//           ...filteredQuery,
//         },
//         include: {
//           user: true,
//         },
//       });
//     },
//   });

export function hello() {
  console.log("")
}