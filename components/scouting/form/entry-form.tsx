import { MatchFormQuestion } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  questions: MatchFormQuestion[];
}

interface Answer {
  questionId: string;
  slot1?: string;
  slot2?: string;
  slot3?: string[];
}

interface State {
  // matchFormId: string;
  answers: Answer[];
}

export default class EntryForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      answers: [],
    };
  }

  setAnswer(answer: Answer) {
    const answers: Answer[] = this.state.answers;
    answers.push(answer);
    this.setState({ answers: answers });
  }

  render(): React.ReactNode {
    return (
      <div className="min-h-screen dark:text-white">
        {this.props.questions.map((question, i) => (
          <div>
            
          </div>
        ))}
      </div>
    );
  }
}
