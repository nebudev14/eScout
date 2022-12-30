import { SetStateAction } from "react";
import { Answer } from "./form-types";

export interface Modal {
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  onClose?: () => void;
}

export interface MatchFormInput {
  label: string;
  id: string;
  updateState?: (answer: Answer) => void;
}