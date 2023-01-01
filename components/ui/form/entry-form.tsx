import { renderFormQuestion } from "../../../util/render-question-model";
import { Answer } from "../../../types/form-types";
import React from "react";
import { useQuery } from "../../../hooks/trpc";
import { EntryFormType } from "../../../types/misc-types";
import { useSession } from "next-auth/react";

interface Props {
  form: EntryFormType | undefined;
}

interface State {
  answers: Answer[];
  // selectedTeam: string;
}

export default class EntryForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setAnswer = this.setAnswer.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const answers: Answer[] = [];

    this.props.form?.categories.forEach((c) =>
      c.questions.forEach((q) =>
        answers.push({ questionId: q.id, slot1: "", slot2: "", slot3: [] })
      )
    );

    this.state = {
      answers: answers,
      // selectedTeam:
      //   user?.teams.length !== 0 ? (user?.teams[0].teamId as string) : "",
    };

    console.log(this.state.answers);
  }

  setAnswer(answers: Answer[], newAnswer: Answer): Answer[] {
    const currentAnswer = answers.filter(
      (e) => e.questionId === newAnswer.questionId
    )?.[0];

    currentAnswer.slot1 = newAnswer.slot1;
    currentAnswer.slot2 = newAnswer.slot2;
    currentAnswer.slot3 = newAnswer.slot3;

    console.log(this.state.answers);

    return answers;
  }

  updateState(answer: Answer) {
    const answers: Answer[] = this.setAnswer(this.state.answers, answer);

    this.setState({ answers: answers });
  }

  render(): React.ReactNode {
    return (
      <div className="min-h-screen dark:text-white">
        {this.props.form?.categories.map((category, i) => (
          <div key={i}>
            <div className="flex flex-col mb-4 border-b-2 dark:border-zinc-700">
              <h1 className="py-2 mb-2 mr-4 text-3xl font-semibold">
                {category?.name}
              </h1>
            </div>
            <div>
              {category.questions.map((question, j) => (
                <div key={j} className="my-8">
                  {renderFormQuestion(
                    question.questionType,
                    question.prompt as string,
                    question.id,
                    this.updateState,
                    question.options
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
