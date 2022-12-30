import { Dialog } from "@headlessui/react";
import { SetStateAction } from "jotai";
import ModalWrapper from "../ui/modal-wrapper";
import { MatchFormCategory } from "@prisma/client";
import React, { useState } from "react";
import { ScoreBoard } from "../ui/form/score-board";
import { MatchQuestionType } from "@prisma/client";
import { BoolInput } from "../ui/form/bool-input";
import CounterInput from "../ui/form/counter-input";
import { FormInput } from "../ui/form/form-input";
import { Container } from "../ui/container";

const EditMatchModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (update: SetStateAction<boolean>) => void;
  category: MatchFormCategory;
}> = ({ isOpen, setIsOpen, category }) => {
  const [desiredPrompt, setDesiredPrompt] = useState("");
  const [desiredType, setDesiredType] = useState<MatchQuestionType>("SCORE");

  function renderDesiredQuestion(
    questionType: MatchQuestionType,
    label: string
  ) {
    switch (questionType) {
      case "SCORE":
        return <ScoreBoard label={label} id="" />;
      case "BOOL":
        return <BoolInput label={label} id="" />;
      case "COUNTER":
        return <CounterInput label={label} id="" />;
      case "INPUT":
        return <FormInput label={label} id="" />;
    }
  }

  const createQuestion = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      questionType: { value: string };
      scoreValue: { value: number };
    }
  }

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
      <form>
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
          <option value={MatchQuestionType.INPUT}>Text Input</option>
        </select>

        {desiredType === MatchQuestionType.SCORE ||
        desiredType === MatchQuestionType.COUNTER ? (
          <div className="grid grid-cols-2 my-2">
            <Container>
              <label className="p-2 text-lg leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline">
                Score
              </label>
              <input
                required
                id="scoreValue"
                type="number"
                className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
              />
            </Container>
          </div>
        ) : null}

        <Dialog.Title className="my-3 font-semibold">
          Question Preview
        </Dialog.Title>
        {renderDesiredQuestion(desiredType, desiredPrompt)}
        <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Create
          </button>
      </form>
    </ModalWrapper>
  );
};

export default EditMatchModal;
