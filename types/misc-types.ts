import { SetStateAction } from "react";
import { Answer } from "./form-types";
import { MatchForm, MatchFormCategory, MatchFormQuestion } from "@prisma/client";

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