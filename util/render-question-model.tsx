import { MatchQuestionType } from "@prisma/client";
import { ScoreBoard } from "../components/ui/form/score-board";
import { BoolInput } from "../components/ui/form/bool-input";
import { CounterInput } from "../components/ui/form/counter-input";
import { FormInput } from "../components/ui/form/form-input";

export function renderDesiredQuestionDisplay(
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