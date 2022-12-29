import { useRouter } from "next/router";
import { CreatePitQuestionModal } from "../../../../../components/modals/create-pit-question";
import QuestionCard from "../../../../../components/ui/question-card";
import { useQuery } from "../../../../../hooks/trpc";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

const EditPitScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "pit.get-by-id",
    { id: router.query.pit_id as string },
  ]);

  const [isOpen, setIsOpen] = useState(false);

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
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 gap-2">
          {data?.questions.map((question, i) => (
            <QuestionCard key={i} question={question} />
          ))}
        </div>
      </div>

      <CreatePitQuestionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default EditPitScout;
