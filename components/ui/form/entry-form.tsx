import { renderFormQuestion } from "../../../util/render-question-model";
import { Answer } from "../../../types/form-types";
import React from "react";
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
    this.updateForm = this.updateForm.bind(this);
  }

  updateForm() {
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
              slot3: "0",
              slot4: [],
              // gamepieces: [],
              // chargeFieldNodes: [],
            });
            break;
          case "COUNTER":
            answers.push({
              questionId: q.id,
              slot1: "0",
              slot2: "0",
              slot3: "0",
              slot4: [],
            });
            break;
          case "INPUT":
            answers.push({
              questionId: q.id,
              slot1: "",
              slot2: "",
              slot3: "",
              slot4: [],
            });
            break;
          case "BOOL":
            answers.push({
              questionId: q.id,
              slot1: "No",
              slot2: "0",
              slot3: "0",
              slot4: [],
            });
            break;
          case "SELECT":
            answers.push({
              questionId: q.id,
              slot1: q.options[0],
              slot2: "0",
              slot3: "0",
              slot4: [],
            });
            break;
          case "GAMEPIECE_INFO":
            answers.push({
              questionId: q.id,
              slot1: "0",
              slot2: "0",
              slot3: "0",
              slot4: [],
              gamepiece: [],
            });
            break;
          case "FIELD":
            answers.push({
              questionId: q.id,
              slot1: "0",
              slot2: "0",
              slot3: "0",
              slot4: [],
              chargeField: [],
            });
            break;
        }
      })
    );

    this.setState({ answers: answers });
  }

  componentDidMount() {
    this.updateForm();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) this.updateForm();
  }

  setAnswer(answers: Answer[], newAnswer: Answer): Answer[] {
    const currentAnswer = answers.filter(
      (e) => e.questionId === newAnswer.questionId
    )?.[0];

    currentAnswer.slot1 = newAnswer.slot1;
    currentAnswer.slot2 = newAnswer.slot2;
    currentAnswer.slot3 = newAnswer.slot3;
    currentAnswer.slot4 = newAnswer.slot4;
    currentAnswer.gamepiece = newAnswer.gamepiece;
    currentAnswer.chargeField = newAnswer.chargeField;

    return answers;
  }

  updateState(answer: Answer) {
    const answers: Answer[] = this.setAnswer(this.state.answers, answer);
    console.log(this.state);
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
            <div className="flex flex-col mb-4 border-b-8 dark:border-zinc-700">
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
        <button type="submit" onClick={() => this.submit()}>
          Submit
        </button>
      </div>
    );
  }
}
