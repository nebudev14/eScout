import { z } from "zod";
import { MatchType, RungLevel } from "@prisma/client";

export const createEntrySchema = z.object({
    id: z.string().cuid(),
    teamNumber: z.number(),
    
    matchNumber: z.number(),
    matchType: z.nativeEnum(MatchType),
    eventName: z.string(),

    mobility: z.boolean(),

    autoHighShotsMade: z.number(),
    autoHighShotsTotal: z.number(),
    autoLowShotsMade: z.number(),
    autoLowShotsTotal: z.number(),

    teleopHighShotsMade: z.number(),
    teleopHighShotsTotal: z.number(),
    teleopLowShotsMade: z.number(),
    teleopLowShotsTotal: z.number(),

    climbStart: z.number(),
    climbEnd: z.number(),
    climbRung: z.nativeEnum(RungLevel),

    defended: z.array(z.number()),
    defendedBy: z.array(z.number()),

    comments: z.string()
});

export const getEntrySchema = z.object({
    id: z.string().cuid(),
})