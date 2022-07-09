import type { NextPage } from "next";
import React from "react";
import { Protected } from "../components/auth/protected";
import { Container } from "../components/ui/container";
import { MatchInfo } from "../components/ui/form/match-info";
import { ScoreBoard } from "../components/ui/form/score-board";
import { Input } from "../components/ui/input";

const submitData = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  const target = event.target as typeof event.target & {
    matchNumber: { value: string };
    teamNumber: { value: string };
  };

  console.log(document.getElementById("highGoalShots")?.innerText);
};

const Scout: NextPage = () => {
  return (
    <Protected>
      <div className="h-full px-56 py-4 lg:px-4">
        <form onSubmit={submitData} className="grid grid-cols-1">
          <MatchInfo />
          <h1 className="mb-4 text-3xl font-semibold">Auto</h1>
          <Container>
            <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
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
          <ScoreBoard label="High Goal" id="autoHighGoal" />
          <ScoreBoard label="Low Goal" id="autoLowGoal" />
          <h1 className="mt-4 mb-2 text-3xl font-semibold">Teleop</h1>
          <ScoreBoard label="High Goal" id="teleopHighGoal" />
          <ScoreBoard label="Low Goal" id="teleopLowGoal" />
          <h1 className="my-4 text-3xl font-semibold ">Defense</h1>
          <div className="mb-2">
            <Container>
              <label className="flex items-center justify-start p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
                Defended
              </label>
              <div className="flex">
                <input
                  className="w-10/12 h-full p-2 text-lg border rounded-l border-blue-lighter"
                  type="text"
                  placeholder="Team number"
                  autoComplete="off"
                />
                <button className="flex items-center justify-center px-2 text-white bg-blue-500 border-t border-b border-l rounded-r p bg-blue-lighter border-blue-lighter text-blue-dark">
                  +
                </button>
              </div>
            </Container>
          </div>
          <Container>
            <label className="flex items-center justify-start p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
              Defended by
            </label>
            <div className="flex">
              <input
                className="w-10/12 h-full p-2 text-lg border rounded-l border-blue-lighter"
                type="text"
                placeholder="Team number"
                autoComplete="off"
              />
              <button className="flex items-center justify-center px-2 text-white bg-blue-500 border-t border-b border-l rounded-r p bg-blue-lighter border-blue-lighter text-blue-dark">
                +
              </button>
            </div>
          </Container>
          <h1 className="my-4 text-3xl font-semibold ">Endgame</h1>
          <div className="mb-2">
            <Container>
              <label className="p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
                Climb start time
              </label>
              <Input
                id="climbStart"
                placeholder="Start time"
                type="number"
                autoComplete="off"
              />
            </Container>
          </div>
          <div className="mb-2">
            <Container>
              <label className="p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
                Climb end time
              </label>
              <Input
                id="climbEnd"
                placeholder="End time"
                type="number"
                autoComplete="off"
              />
            </Container>
          </div>
          <Container>
            <label className="p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
              Climb rung
            </label>
            <select
              id="climbBar"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
            >
              <option>None</option>
              <option>Low</option>
              <option>Mid</option>
              <option>High</option>
              <option>Traversal</option>
            </select>
          </Container>
          <h1 className="my-4 text-3xl font-semibold ">Comments</h1>
          <textarea id="comments" className="p-4 border rounded-xl border-slate-300" autoComplete="off" rows={10}  />
          <button
            type="submit"
            className="p-2 mt-4 text-lg font-semibold text-white bg-teal-500 rounded shadow focus:outline-none focus:shadow-outline hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      </div>
    </Protected>
  );
};

export default Scout;
