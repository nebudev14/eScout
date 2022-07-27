import type { NextPage } from "next";
import React from "react";
import { Protected } from "../../components/auth/protected";
import { Container } from "../../components/ui/container";
import { MatchInfo } from "../../components/ui/form/match-info";
import { ScoreBoard } from "../../components/ui/form/score-board";
import { Input } from "../../components/ui/input";
import { MatchType, RungLevel } from "@prisma/client";
import { getNumberById } from "../../util/get-number-by-id";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "../../hooks/trpc";

const Scout: NextPage = () => {
  const defendedRef = useRef<HTMLInputElement>(null);
  const defendedByRef = useRef<HTMLInputElement>(null);

  const [defended, setDefended] = useState<number[]>([]);
  const [defendedBy, setDefendedBy] = useState<number[]>([]);

  const { data: session } = useSession();
  const userData = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  const submitEntry = useMutation("entry.create");

  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      // Match Info
      matchType: { value: MatchType };
      matchNumber: { value: string };
      teamNumber: { value: string };
      eventName: { value: string };
      mobility: { value: string };

      // End game data
      climbStart: { value: string };
      climbEnd: { value: string };
      climbRung: { value: RungLevel };

      // Comments
      comments: { value: string };

      // Entry team
      entryTeamNumber: { value: string };
      
    };

    const data = {
      teamNumber: Number(target.teamNumber.value),
      entryTeamNumber: Number(target.entryTeamNumber.value),
      matchNumber: Number(target.matchNumber.value),
      matchType: target.matchType.value,
      eventName: target.eventName.value,
      
      mobility: target.mobility.value === "yes",

      autoHighShotsMade: getNumberById("autoHighGoalShots"),
      autoHighShotsTotal: getNumberById("autoHighGoalTotal"),
      autoLowShotsMade: getNumberById("autoLowGoalShots"),
      autoLowShotsTotal: getNumberById("autoLowGoalTotal"),

      teleopHighShotsMade: getNumberById("teleopHighGoalShots"),
      teleopHighShotsTotal: getNumberById("teleopHighGoalTotal"),
      teleopLowShotsMade: getNumberById("teleopLowGoalShots"),
      teleopLowShotsTotal: getNumberById("teleopLowGoalTotal"),

      climbStart: Number(target.climbStart.value),
      climbEnd: Number(target.climbEnd.value),
      climbRung: target.climbRung.value,

      defended: defended,
      defendedBy: defendedBy,

      comments: target.comments.value,

    };

    // weee data submit
    await submitEntry.mutateAsync(data);
  };

  return (
    <Protected>
      <div className="h-full px-56 py-4 lg:px-4">
        <form onSubmit={submitData} className="grid grid-cols-1">
          <h1 className="mt-4 mb-2 text-3xl font-semibold">Match Info</h1>
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
              <option value="no">No</option>
              <option value="yes">Yes</option>
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
                  type="number"
                  id="defended"
                  placeholder="Team number"
                  autoComplete="off"
                  ref={defendedRef}
                />
                <button
                  type="button"
                  className="flex items-center justify-center px-4 text-white bg-blue-500 border-t border-b border-l rounded-r p bg-blue-lighter border-blue-lighter text-blue-dark"
                  onClick={() => {
                    if (defendedRef.current !== null) {
                      setDefended([
                        ...defended,
                        Number(defendedRef.current?.value),
                      ]);
                      defendedRef.current.value = "";
                    }
                  }}
                >
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
                id="defendedBy"
                type="number"
                placeholder="Team number"
                autoComplete="off"
                ref={defendedByRef}
              />
              <button
                type="button"
                className="flex items-center justify-center px-4 text-white bg-blue-500 border-t border-b border-l rounded-r p bg-blue-lighter border-blue-lighter text-blue-dark"
                onClick={() => {
                  if (defendedByRef.current !== null) {
                    setDefendedBy([
                      ...defendedBy,
                      Number(defendedByRef.current?.value),
                    ]);
                    defendedByRef.current.value = "";
                  }
                }}
              >
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
              id="climbRung"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
            >
              <option value={RungLevel.NONE}>None</option>
              <option value={RungLevel.LOW}>Low</option>
              <option value={RungLevel.MID}>Mid</option>
              <option value={RungLevel.HIGH}>High</option>
              <option value={RungLevel.TRAVERSAL}>Traversal</option>
            </select>
          </Container>
          <h1 className="my-4 text-3xl font-semibold ">Comments</h1>
          <textarea
            id="comments"
            className="p-4 mb-4 border rounded-xl border-slate-300 focus:outline-none"
            autoComplete="off"
            rows={10}
            placeholder="Team 1155 and 2265 popped off this round!"
          />
          <Container>
            <label className="p-2 text-lg leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
              Submit data to
            </label>
            <select
              id="teamNumber"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
            >
              {userData?.data?.teams.map((team, i) => (
                <option key={i} value={team.teamNumber}>
                  {team.teamNumber}
                </option>
              ))}
            </select>
          </Container>
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
