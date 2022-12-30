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
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
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
        <Dialog.Title className="my-3 font-semibold">
          Question Preview
        </Dialog.Title>
        {renderDesiredQuestion(desiredType, desiredPrompt)}
      </form>
    </ModalWrapper>
  );
};

export default EditMatchModal;
