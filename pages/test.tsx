import { NextPage } from "next";
import EntryForm from "../components/scouting/form/entry-form";
import { ScoreBoard } from "../components/scouting/form/score-board";

const Test: NextPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 py-4 dark:text-white px-96 lg:px-4">
      <ScoreBoard id="lmao" label="High Goal" />
      {/* <EntryForm /> */}
    </div>
  );
}

export default Test;