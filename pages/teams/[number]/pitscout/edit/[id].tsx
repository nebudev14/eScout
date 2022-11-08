import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { CreateQuestionModal } from "../../../../../components/modals/create-question";
import QuestionCard from "../../../../../components/ui/question-card";
import { useQuery } from "../../../../../hooks/trpc";
import { createQuestionModalAtom } from "../../../../../server/atoms";
import { BiArrowBack } from "react-icons/bi";

const EditPitScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "pit.get-by-id",
    { id: router.query.id as string },
  ]);

  const [, setIsOpen] = useAtom(createQuestionModalAtom);

  return (
    <div className="min-h-screen px-48 py-12 dark:text-white">
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
          className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 gap-2">
          {data?.questions.map((question, i) => (
            <QuestionCard key={i} question={question} />
          ))}
        </div>
      </div>

      <CreateQuestionModal />
    </div>
  );
};

export default EditPitScout;
