import { FieldNodeAction, GamepieceHeight, Location, PieceType } from "@prisma/client";
import { z } from "zod";

export const gamepieceSchema = z.object({
  height: z.nativeEnum(GamepieceHeight),
  type: z.nativeEnum(PieceType),
  location: z.nativeEnum(Location)
}).array()

export const chargedFieldNodeSchema = z.object({
  xCoord: z.number(),
  yCoord: z.number(),
  pieceType: z.nativeEnum(PieceType),
  action: z.nativeEnum(FieldNodeAction)
}).array()

