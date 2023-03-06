import { NextPage } from "next";
import { Container } from "../components/ui/container";
import { BoolInput } from "../components/ui/form/bool-input";
import EntryForm from "../components/ui/form/entry-form";
import { FormInput } from "../components/ui/form/form-input";
import { ScoreBoard } from "../components/ui/form/score-board";
import { MatchFormQuestion } from "@prisma/client";
import { parseOperation } from "@util/parser";

const Test: NextPage = () => {
  const result = parseOperation("AVERAGE(CATEGORY(id, slot#))");
  
  
  return (
    <div className="flex flex-col min-h-screen py-4 dark:text-white px-96 lg:px-4">
      {/* {result} */}
    </div>
  );
};

export default Test;
