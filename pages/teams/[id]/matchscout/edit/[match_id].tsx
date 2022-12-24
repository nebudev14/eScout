import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { useQuery } from "../../../../../hooks/trpc";
import { createMatchQuestionModalAtom } from "../../../../../server/atoms";
import { CreateMatchQuestionModal } from "../../../../../components/modals/create-match-question";

const EditMatchScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "match.get-by-id",
    { id: router.query.match_id as string },
  ]);

  const [, setIsOpen] = useAtom(createMatchQuestionModalAtom);

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
      <CreateMatchQuestionModal />
    </div>
  );
};

export default EditMatchScout;