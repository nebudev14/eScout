import ModalWrapper from "@components/ui/modal-wrapper";
import { Modal } from "types/misc-types";
import { Dialog } from "@headlessui/react";
import { trpc } from "@util/trpc/trpc";

export const CreateStatProfileModal: React.FC<Modal> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-center text-gray-900"
      >
        Create Stat Profile
      </Dialog.Title>
      <div className="mt-2">
        <form>
          
        </form>
      </div>
    </ModalWrapper>
  );
};
