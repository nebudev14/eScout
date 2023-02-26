import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { trpc } from "@util/trpc/trpc";
import { useRouter } from "next/router";
import { MatchQuestionType } from "@prisma/client";
import { Modal } from "types/misc-types";
import ModalWrapper from "../ui/modal-wrapper";

export const CreateMatchCategoryModal: React.FC<Modal> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const util = trpc.useContext();

  const [questionType, setQuestionType] = useState<MatchQuestionType>();
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  // For entering in new options
  const [currentOption, setCurrentOption] = useState<string>("");

  const createCategoryQuery = trpc.match.createCategory.useMutation({
    onSuccess() {
      util.match.getById.invalidate();
    }
  })


  const createCategory = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      categoryName: { value: string };
    };

    await createCategoryQuery.mutateAsync({
      entityId: router.query.match_id as string,
      name: target.categoryName.value,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-center text-gray-900"
      >
        Add category
      </Dialog.Title>
      <div className="mt-2">
        <form onSubmit={createCategory}>
          <div className="my-2">
            <h1 className="mr-2 font-semibold">Name</h1>
            <input
              id="categoryName"
              className="w-full p-2 border-2 rounded-lg outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};
