import { Dialog } from "@headlessui/react";
import { Modal } from "../../types/misc-types";
import { SetStateAction } from "jotai";
import ModalWrapper from "../ui/modal-wrapper";
import { MatchFormCategory } from "@prisma/client";

const EditMatchModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  category: MatchFormCategory;
}> = ({ isOpen, setIsOpen, category }) => {
  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title className="mb-4 text-lg">
        Editing <b>{category === null ? null : category.name}</b>
      </Dialog.Title>
    </ModalWrapper>
  );
};

export default EditMatchModal;
