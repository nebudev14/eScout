import { renderFormQuestion } from "../../../util/render-question-model";
import { Answer } from "../../../types/form-types";
import React from "react";
import { useQuery } from "../../../hooks/trpc";
import { useSession } from "next-auth/react";
import { EntryFormType } from "../../../types/misc-types";

interface Props {
  form: EntryFormType | undefined;
  submitResponse: (answer: Answer[]) => void;
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
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    let answers: Answer[] = [];

    this.props.form?.categories.forEach((c) =>
      c.questions.forEach((q) => {
        switch (q.questionType) {
          // Initializing state
          case "SCORE":
            answers.push({
              questionId: q.id,
              slot1: "0",
              slot2: "0",
              slot3: [],
            });
            break;
          case "COUNTER":
            answers.push({
              questionId: q.id,
              slot1: "0",
              slot2: "",
              slot3: [],
            });
            break;
          case "INPUT":
            answers.push({ questionId: q.id, slot1: "", slot2: "", slot3: [] });
            break;
          case "BOOL":
            answers.push({
              questionId: q.id,
              slot1: "No",
              slot2: "",
              slot3: [],
            });
            break;
          case "SELECT":
            answers.push({
              questionId: q.id,
              slot1: q.options[0],
              slot2: "",
              slot3: [],
            });
            break;
        }
      })
    );

    this.setState({ answers: answers });

    console.log(answers);
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

  submit() {
    this.props.submitResponse(this.state.answers);
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
        <button type="submit" onClick={() => this.submit()}>Submit</button>
      </div>
    );
  }
}
