import { NextPage } from "next";
import { Container } from "../components/ui/container";
import { BoolInput } from "../components/ui/form/bool-input";
import CounterInput from "../components/ui/form/counter-input";
import EntryForm from "../components/ui/form/entry-form";
import { FormInput } from "../components/ui/form/form-input";
import { ScoreBoard } from "../components/ui/form/score-board";
import { MatchFormQuestion } from "@prisma/client";

const Test: NextPage = () => {
  const questions: MatchFormQuestion[] = [
    
  ];
  return (
    <div className="flex flex-col min-h-screen py-4 dark:text-white px-96 lg:px-4">
      <EntryForm questions={questions} />
      {/* <div className="mx-2 my-2">
        <ScoreBoard id="lmao" label="High Goal" />
      </div>
      <div className="mx-2 my-2">
        <ScoreBoard id="lmao" label="Low Goal" />
      </div>
      <BoolInput label="Mobility" />
      <FormInput label="yis aaron clinically insane" id="test" />
      <CounterInput label="fsdafda"/> */}
      {/* <ScoreBoard id="lmao" label="High Goal" />
          <ScoreBoard id="lmao" label="High Goal" /> */}

      {/* <EntryForm /> */}
    </div>
  );
};

export default Test;
