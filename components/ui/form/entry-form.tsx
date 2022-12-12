import { MatchFormQuestion } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Answer } from "../../../types/form-types";
import React from "react";
import { ScoreBoard } from "./score-board";

interface Props {
  questions: MatchFormQuestion[];
}

interface State {
  // matchFormId: string;
  answers: Answer[];
}

export default class EntryForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const answers: Answer[] = [];
    props.questions.forEach((q) => answers.push({ questionId: q.id }));
    this.state = {
      answers: answers,
    };
  }

  setAnswer(answers: Answer[], newAnswer: Answer): Answer[] {
    const currentAnswer = answers.filter(e => e.questionId === newAnswer.questionId)[0];
    currentAnswer.slot1 = newAnswer.slot1; // gross
    currentAnswer.slot2 = newAnswer.slot2;
    currentAnswer.slot3 = newAnswer.slot3;
    
    return answers;
  }

  updateState(answer: Answer) {
    const answers: Answer[] = this.setAnswer(this.state.answers, answer);;

    this.setState({ answers: answers });
  }

  render(): React.ReactNode {
    return (
      <div className="min-h-screen dark:text-white">
        <ScoreBoard label="ya" id="yea" updateState={this.updateState} />
        {this.props.questions.map((question, i) => (
          <div></div>
        ))}
      </div>
    );
  }
}
