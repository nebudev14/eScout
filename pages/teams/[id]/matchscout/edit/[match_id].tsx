import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { trpc, useMutation, useQuery } from "../../../../../hooks/trpc";
import { createMatchQuestionModalAtom } from "../../../../../server/atoms";
import { CreateMatchQuestionModal } from "../../../../../components/modals/create-match-category";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { useState } from "react";
import { ConfirmationModal } from "../../../../../components/modals/confirmation-modal";

const EditMatchScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "match.get-by-id",
    { id: router.query.match_id as string },
  ]);

  const { invalidateQueries } = trpc.useContext();

  const [, setIsOpen] = useAtom(createMatchQuestionModalAtom);

  // Category deletion
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Delete confirmation modal
  const [currentCategory, setCurrentCategory] = useState(""); //

  return (
    <div className="min-h-screen px-48 py-12 dark:text-white md:px-4">
      <BiArrowBack
        size={30}
        className="mb-4 duration-150 hover:text-pink-600 hover:cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex items-center justify-start mb-4">
        <h1 className="mr-auto text-3xl">
          Editing <b>{data?.name}</b>
        </h1>
        <button
          className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>
      <div className="mx-12 mt-8">
        {data?.categories.map((category, i) => (
          <div className="flex flex-row items-center mb-4" key={i}>
            <h1 className="mr-4 text-3xl font-semibold">{category?.name}</h1>
            <BsPencilFill size={20} />
            <BsFillTrashFill
              size={20}
              className="ml-4 text-red-400 duration-200 hover:text-red-500 hover:cursor-pointer"
              onClick={() => {
                setCurrentCategory(category.id);
                setIsDeleteOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <CreateMatchQuestionModal />
      <ConfirmationModal
        action="Are you sure you want to delete this category?"
        description="All other questions under this category will also be wiped!"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        func={() => {
          useMutation("match.delete-category", {
            onSuccess() {
              invalidateQueries("match.get-by-id");
            },
          }).mutateAsync({ id: currentCategory });
        }}
      />
    </div>
  );
};

export default EditMatchScout;
