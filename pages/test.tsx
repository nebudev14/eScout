import { NextPage } from "next";
import { Container } from "../components/ui/container";
import { BoolInput } from "../components/ui/form/bool-input";
import EntryForm from "../components/ui/form/entry-form";
import { FormInput } from "../components/ui/form/form-input";
import { ScoreBoard } from "../components/ui/form/score-board";
import { MatchFormQuestion } from "@prisma/client";
import { parseOperation } from "@util/parser";
import { FieldInput } from "@components/ui/form/charged-up/field-input";
import { GamepieceInput } from "@components/ui/form/charged-up/gamepiece";
import { DefenseInput } from "@components/ui/form/defense-input";
import { trpc } from "@util/trpc/trpc";
import { useRef } from "react";

const Test: NextPage = () => {
  return (
    <div>
      
    </div>
  );
};

export default Test;
