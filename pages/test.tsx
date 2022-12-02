import { NextPage } from "next";
import { Container } from "../components/ui/container";
import EntryForm from "../components/ui/form/entry-form";
import { FormInput } from "../components/ui/form/form-input";
import { ScoreBoard } from "../components/ui/form/score-board";

const Test: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen py-4 dark:text-white px-96 lg:px-4">
      <Container>
        <div className="mx-2 my-2">
        <ScoreBoard id="lmao" label="High Goal" />
        </div>
        <div className="mx-2 my-2">
        <ScoreBoard id="lmao" label="High Goal" />
        </div>
      </Container>
      <FormInput label="yeas" id="test" />
          {/* <ScoreBoard id="lmao" label="High Goal" />
          <ScoreBoard id="lmao" label="High Goal" /> */}
      
      {/* <EntryForm /> */}
    </div>
  );
}

export default Test;