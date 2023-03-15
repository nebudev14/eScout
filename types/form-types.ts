import { ChargedFieldNode, FieldNodeAction, PieceType } from "@prisma/client";
export interface Answer {
  questionId: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
  slot4?: string[];
  gamepieces?: GamepieceFormType[];
  chargeFieldNodes?: ChargedFieldNode[];
}

export interface GamepieceFormType {
  height: string;
  type: string;
  location: string;
  matchFormAnswersId: string
}

export interface ChargedFieldNodeType {
  xCoord: number
  yCoord: number
  // piece: PieceType
  // action: FieldNodeAction
}