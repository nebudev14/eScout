import { FieldNodeAction, GamepieceHeight, Location, PieceType } from "@prisma/client";
import { z } from "zod";

export const gamepieceSchema = z.object({
  matchFormAnswersId: z.string(),
  height: z.nativeEnum(GamepieceHeight),
  type: z.nativeEnum(PieceType),
  location: z.nativeEnum(Location)
}).array().optional()

export const chargedFieldNodeSchema = z.object({
  matchFormAnswersId: z.string(),
  xCoord: z.number(),
  yCoord: z.number(),
  piece: z.nativeEnum(PieceType),
  action: z.nativeEnum(FieldNodeAction)
}).array().optional()

