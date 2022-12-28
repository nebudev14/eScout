import React, { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const ConfirmationModal: React.FC<{
  action: string;
  description: string;
  func: () => void;
  isOpen: boolean;
  setIsOpen:(update: SetStateAction<boolean>) => void;
}> = ({ action, description, func, isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div onClick={() => setIsOpen(false)} className="inline font-bold text-red-500 hover:cursor-pointer text-large">X</div>
                <Dialog.Title
                  as="h3"
                  className="mt-2 text-base font-medium leading-6 text-center text-gray-900"
                >
                  {action}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div>
              <Dialog.Description className="mb-5 text-sm text-center">{description}</Dialog.Description>
              <div className="flex items-center justify-center text-white">
                <button onClick={() => setIsOpen(false)} className="px-6 py-1 mx-4 bg-red-500 rounded-lg">No</button>
                <button onClick={func} className="px-6 py-1 mx-4 bg-green-500 rounded-lg">Yes</button>
              </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
