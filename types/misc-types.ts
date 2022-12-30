import { SetStateAction } from "react";

export interface Modal {
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  onClose?: () => void;
}
