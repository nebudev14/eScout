import { PitQuestion, PitQuestionType } from "@prisma/client";

const QuestionCard: React.FC<{ question: PitQuestion }> = ({ question }) => {
  return (
    <div className="px-3 py-2 my-2 mr-2 duration-200 border hover:shadow-lg hover:cursor-pointer rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white">
      <h1>{question.prompt}</h1>
      {question.type === PitQuestionType.SELECT ? (
        <div>
          {question.possibleResponses.map((option, i) => (
            <li key={i} className="my-1 text-lg">
              {option}
            </li>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
