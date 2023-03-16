import { Dialog } from "@headlessui/react";
import { SetStateAction } from "jotai";
import ModalWrapper from "../ui/modal-wrapper";
import { MatchFormCategory } from "@prisma/client";
import React, { useState } from "react";
import { MatchQuestionType, MatchPromptType } from "@prisma/client";
import { trpc } from "@util/trpc/trpc";
import { renderDesiredQuestionDisplay } from "../../util/render-question-model";

const EditMatchModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  category: MatchFormCategory;
}> = ({ isOpen, setIsOpen, category }) => {
  const [desiredPrompt, setDesiredPrompt] = useState("");
  const [desiredType, setDesiredType] = useState<MatchQuestionType>("SCORE");

  const [selectOptions, setSelectOptions] = useState<string[]>([]); // If the user wants to add a select input

  const [optionInput, setOptionInput] = useState<string>("");

  const util = trpc.useContext();

  const createQuestionQuery = trpc.match.addQuestion.useMutation({
    onSuccess() {
      util.match.invalidate();
    }
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
      entityId: category.id,
      prompt: target.questionPrompt.value,
      questionType: target.questionType.value,
      promptType: isNumerical ? MatchPromptType.NUMBER : MatchPromptType.TEXT,
      options:
        target.questionType.value === MatchQuestionType.SELECT
          ? selectOptions
          : [],
    });
    setDesiredPrompt("");
    setSelectOptions([]);
    setOptionInput("");
    setDesiredType("SCORE");

    setIsOpen(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setDesiredPrompt("");
        setSelectOptions([]);
        setOptionInput("");
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
          <option value={MatchQuestionType.GAMEPIECE_INFO}>Gamepiece Info</option>
        </select>

        {desiredType === MatchQuestionType.SELECT ? (
          <div className="mb-3">
            <Dialog.Title>Add Option</Dialog.Title>
            <input
              className="p-1 mb-2 border-2 rounded-l-lg outline-none"
              value={optionInput}
              onChange={async (event: React.SyntheticEvent) =>
                setOptionInput((event.target as HTMLInputElement).value)
              }
            />
            <button
              formNoValidate
              type="button"
              className="px-3 py-1 text-lg text-white rounded-r-lg bg-cyan-500"
              onClick={() => {
                setSelectOptions([...selectOptions, optionInput]);
                setOptionInput("");
              }}
            >
              +
            </button>
            {selectOptions.map((option, i) => (
              <div className="flex items-center my-2">
                <input type="radio" key={i} name={option} />
                <label className="ml-2">{option}</label>
              </div>
            ))}
          </div>
        ) : null}

        <Dialog.Title className="my-3 font-semibold">
          Question Preview
        </Dialog.Title>
        {renderDesiredQuestionDisplay(
          desiredType,
          desiredPrompt,
          selectOptions
        )}
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
