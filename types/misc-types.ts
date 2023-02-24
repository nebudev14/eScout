import { SetStateAction } from "react";
import { Answer } from "./form-types";
import { MatchForm, MatchFormCategory, MatchFormQuestion } from "@prisma/client";
import { z } from "zod";

export interface Modal {
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  onClose?: () => void;
}

export interface MatchFormInput {
  label: string;
  id: string;
  updateState?: (answer: Answer) => void;
  options?: string[]
}

export type EntryFormType = (MatchForm & { categories: (MatchFormCategory & { questions: MatchFormQuestion[]; })[]; })

// this is really cursed too
export enum LEVEL {
  TEAM,
  MATCH_FORM,
  MATCH_QUESTION,
  MATCH_RESPONSE,
  MATCH_CATEGORY,
  PIT_FORM,
  PIT_QUESTION,
  PIT_RESPONSE
}

export const entityId = z.object({
  entityId: z.string().cuid(),
});
