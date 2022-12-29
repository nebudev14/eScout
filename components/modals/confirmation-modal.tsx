import React, { SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import ModalWrapper from "../ui/modal-wrapper";

export const ConfirmationModal: React.FC<{
  action: string;
  description: string;
  func: () => void;
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
}> = ({ action, description, func, isOpen, setIsOpen }) => {
  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        onClick={() => setIsOpen(false)}
        className="inline font-bold text-red-500 hover:cursor-pointer text-large"
      >
        X
      </div>
      <Dialog.Title
        as="h3"
        className="mt-1 text-base font-medium leading-6 text-center text-gray-900"
      >
        {action}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500"></p>
      </div>
      <Dialog.Description className="mb-5 text-sm text-center">
        {description}
      </Dialog.Description>
      <div className="flex items-center justify-center text-white">
        <button
          onClick={() => setIsOpen(false)}
          className="px-6 py-1 mx-4 bg-red-500 rounded-lg"
        >
          No
        </button>
        <button
          onClick={func}
          className="px-6 py-1 mx-4 bg-green-500 rounded-lg"
        >
          Yes
        </button>
      </div>
    </ModalWrapper>
  );
};
