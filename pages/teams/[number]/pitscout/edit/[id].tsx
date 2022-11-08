import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { CreateQuestionModal } from "../../../../../components/modals/create-question";
import { useQuery } from "../../../../../hooks/trpc";
import { createQuestionModalAtom } from "../../../../../server/atoms";

const EditPitScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "pit.get-by-id",
    { id: router.query.id as string },
  ]);

  const [, setIsOpen] = useAtom(createQuestionModalAtom);

  return (
    <div className="h-screen px-48 py-12 dark:text-white">
      <div className="flex items-center justify-start">
        <h1 className="mr-auto text-3xl">
          <b>{data?.name}</b>
        </h1>
        <button
          className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>

      <CreateQuestionModal />
    </div>
  );
};

export default EditPitScout;
