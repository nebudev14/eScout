import { ChargedFieldNode, FieldNodeAction, GamepieceHeight, Location, PieceType } from "@prisma/client";
export interface Answer {
  questionId: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
  slot4?: string[];
  gamepiece?: GamepieceFormType[];
  chargeField?: ChargedFieldNodeType[];
}

export interface GamepieceFormType {
  height: GamepieceHeight;
  type: PieceType;
  location: Location;
}

export interface ChargedFieldNodeType {
  xCoord: number
  yCoord: number
  piece: PieceType
  action: FieldNodeAction
}