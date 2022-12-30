import { Dialog } from "@headlessui/react";
import { SetStateAction } from "jotai";
import ModalWrapper from "../ui/modal-wrapper";
import { MatchFormCategory } from "@prisma/client";
import React, { useState } from "react";
import { MatchQuestionType, MatchPromptType } from "@prisma/client";
import { Container } from "../ui/container";
import { trpc, useMutation } from "../../hooks/trpc";
import { renderDesiredQuestionDisplay } from "../../util/render-question-model";

const EditMatchModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  category: MatchFormCategory;
}> = ({ isOpen, setIsOpen, category }) => {
  const [desiredPrompt, setDesiredPrompt] = useState("");
  const [desiredType, setDesiredType] = useState<MatchQuestionType>("SCORE");

  const { invalidateQueries } = trpc.useContext();

  const createQuestionQuery = useMutation("match.add-question", {
    onSuccess() {
      invalidateQueries("match.get-by-id");
    },
  });

  const createQuestion = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      questionPrompt: { value: string };
      questionType: { value: MatchQuestionType };
      scoreValue: { value: string };
    };

    const isNumerical =
      target.questionType.value === "SCORE" ||
      target.questionType.value === "COUNTER";

    await createQuestionQuery.mutateAsync({
      prompt: target.questionPrompt.value,
      questionType: target.questionType.value,
      promptType: isNumerical ? MatchPromptType.NUMBER : MatchPromptType.TEXT,
      categoryId: category.id,
    });

    setIsOpen(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setDesiredPrompt("");
        setDesiredType("SCORE");
      }}
    >
      <Dialog.Title className="mb-4 text-2xl">
        Editing <b>{category === null ? null : category.name}</b>
      </Dialog.Title>

      {/* Add Question */}
      <form onSubmit={createQuestion}>
        <Dialog.Title className="mb-3 text-lg font-semibold">
          Add question
        </Dialog.Title>
        <Dialog.Title>Prompt</Dialog.Title>
        <input
          id="questionPrompt"
          className="w-full p-2 mb-3 border-2 rounded-lg outline-none"
          required
          autoComplete="off"
          onChange={(e: React.SyntheticEvent) =>
            setDesiredPrompt((e.target as HTMLInputElement).value)
          }
        />
        <Dialog.Title>Question Type</Dialog.Title>
        <select
          id="questionType"
          className="p-2 mb-3 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          onChange={(e: React.SyntheticEvent) =>
            setDesiredType(
              (e.target as HTMLSelectElement).value as MatchQuestionType
            )
          }
        >
          <option value={MatchQuestionType.SCORE}>Scoreboard</option>
          <option value={MatchQuestionType.BOOL}>Yes/No</option>
          <option value={MatchQuestionType.COUNTER}>Counter</option>
          <option value={MatchQuestionType.SELECT}>Select</option>
          <option value={MatchQuestionType.INPUT}>Text Input</option>
        </select>

        <Dialog.Title className="my-3 font-semibold">
          Question Preview
        </Dialog.Title>
        {renderDesiredQuestionDisplay(desiredType, desiredPrompt)}
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Create
        </button>
      </form>
    </ModalWrapper>
  );
};

export default EditMatchModal;
