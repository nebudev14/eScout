import { PitQuestion, PitQuestionType } from "@prisma/client";
import { useRouter } from "next/router";
import { BsFillTrashFill } from "react-icons/bs";
import { trpc, useMutation } from "../../hooks/trpc";

const QuestionCard: React.FC<{ question: PitQuestion }> = ({ question }) => {
  const { invalidateQueries } = trpc.useContext();
  const router = useRouter();
  const mutatePitScout = useMutation("pit.delete-question", {
    onSuccess() {
      invalidateQueries("pit.get-by-id");
    }
  })

  return (
    <div className="px-3 py-2 my-2 mr-2 duration-200 border hover:shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white">
      <div className="flex items-center">
        <h1 className="mr-auto text-xl">
          <b>{question.prompt}</b>
        </h1>
        <BsFillTrashFill className="duration-150 hover:cursor-pointer hover:text-red-400" onClick={async () => {
          await mutatePitScout.mutateAsync({
            id: router.query.id as string,
            questionId: question.id
          })
        }} />
      </div>
      {question.type === PitQuestionType.SELECT ? (
        <div>
          {question.possibleResponses.map((option, i) => (
            <li key={i} className="my-1 text-base">
              {option}
            </li>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
