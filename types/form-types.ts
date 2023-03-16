import { ChargedFieldNode, FieldNodeAction, PieceType } from "@prisma/client";
export interface Answer {
  questionId: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
  slot4?: string[];
  gamepiece?: GamepieceFormType[];
  chargeFieldNodes?: ChargedFieldNode[];
}

export interface GamepieceFormType {
  height: string;
  type: string;
  location: string;
}

export interface ChargedFieldNodeType {
  xCoord: number
  yCoord: number
  // piece: PieceType
  // action: FieldNodeAction
}