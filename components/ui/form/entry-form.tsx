import {
  MatchForm,
  MatchFormQuestion,
  MatchFormCategory,
} from "@prisma/client";
import { useSession } from "next-auth/react";
import { Answer } from "../../../types/form-types";
import React from "react";
import { ScoreBoard } from "./score-board";
import { FormInput } from "./form-input";
import { EntryFormType } from "../../../types/misc-types";

interface Props {
  form: EntryFormType | undefined;
}

interface State {
  // matchFormId: string;
  answers: Answer[];
}

export default class EntryForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const answers: Answer[] = [];
    props.form?.categories.forEach((c) =>
      c.questions.forEach((q) => answers.push({ questionId: q.id }))
    );
    this.state = {
      answers: answers,
    };

    console.log(answers);
  }

  setAnswer(answers: Answer[], newAnswer: Answer): Answer[] {
    const currentAnswer = answers.filter(
      (e) => e.questionId === newAnswer.questionId
    )[0];
    // gross
    currentAnswer.slot1 = newAnswer.slot1; 
    currentAnswer.slot2 = newAnswer.slot2;
    currentAnswer.slot3 = newAnswer.slot3;

    return answers;
  }

  updateState(answer: Answer) {
    const answers: Answer[] = this.setAnswer(this.state.answers, answer);

    this.setState({ answers: answers });
  }

  render(): React.ReactNode {
    return (
      <div className="min-h-screen dark:text-white">
        
      </div>
    );
  }
}
