import { PitQuestion, PitQuestionType } from "@prisma/client";
import { BsFillTrashFill } from "react-icons/bs";
import { trpc } from "@util/trpc/trpc";

const QuestionCard: React.FC<{ question: PitQuestion }> = ({ question }) => {
  const util = trpc.useContext();
  const mutatePitScout = trpc.pit.deletePitQuestion.useMutation({
    onSuccess() {
      util.pit.getById.invalidate();
    }
  })

  return (
    <div className="px-5 py-3 my-2 mr-2 duration-200 border hover:shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white">
      <div className="flex items-center">
        <h1 className="mr-auto text-xl">
          <b>{question.prompt}</b>
        </h1>
        <BsFillTrashFill className="duration-150 hover:cursor-pointer hover:text-red-400" onClick={async () => {
          await mutatePitScout.mutateAsync({
            entityId: question.id
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
