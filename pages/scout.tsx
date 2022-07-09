import type { NextPage } from "next";
import React from "react";
import { Protected } from "../components/auth/protected";
import { Container } from "../components/ui/container";
import { Input } from "../components/ui/input";
import { MatchInfo } from "../components/ui/match-info";

const submitData = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  const target = event.target as typeof event.target & {
    matchNumber: { value: string };
    teamNumber: { value: string };
  };

  console.log(target.matchNumber.value);
};

const Scout: NextPage = () => {
  return (
    <Protected>
      <div className="h-screen p-4">
        <form onSubmit={submitData} className="grid grid-cols-1">
          <MatchInfo />
          <h1 className="mb-2 text-xl font-semibold">Auto</h1>
          <Container>
            <label className="p-2 text-lg font-semibold leading-tight border rounded shadow focus:outline-none focus:shadow-outline">
              Mobility
            </label>
            <select
              id="mobility"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </Container>
          <Container>
            <label className="p-2 text-lg font-semibold leading-tight border rounded shadow focus:outline-none focus:shadow-outline">
              High Goal
            </label>
            <div className="flex items-center text-lg font-medium leading-tight border rounded shadow focus:outline-none focus:shadow-outline justify-evenly">
              <h1>0</h1>
              <h1 className="flex items-center justify-center h-full px-4 text-center border-l-2 border-r-2 border-slate-300" >/</h1>
              <h1>0</h1>
            </div>
          </Container>
          <button
            type="submit"
            className="p-2 mt-2 text-lg font-semibold text-white bg-teal-500 rounded shadow focus:outline-none focus:shadow-outline hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      </div>
    </Protected>
  );
};

export default Scout;
