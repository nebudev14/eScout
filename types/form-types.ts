import { Gamepiece, ChargedFieldNode } from "@prisma/client";
export interface Answer {
  questionId: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
  slot4?: string[];
  gamepieces?: Gamepiece[];
  chargeFieldNodes?: ChargedFieldNode[];
}
