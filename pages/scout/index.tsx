import type { NextPage } from "next";
import React from "react";
import { Protected } from "../../components/auth/protected";
import { Container } from "../../components/ui/container";
import { MatchInfo } from "../../components/scouting/form/match-info";
import { ScoreBoard } from "../../components/scouting/form/score-board";
import { Input } from "../../components/ui/input";
import { MatchType, RungLevel } from "@prisma/client";
import { getNumberById } from "../../util/get-number-by-id";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "../../hooks/trpc";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { setSelectedCompAtom } from "../../server/atoms";

const Scout: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const submitEntry = useMutation("entry.create");

  const [selectedComp] = useAtom(setSelectedCompAtom);

  const defendedRef = useRef<HTMLInputElement>(null);
  const defendedByRef = useRef<HTMLInputElement>(null);

  const [defended, setDefended] = useState<number[]>([]);
  const [defendedBy, setDefendedBy] = useState<number[]>([]);

  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      // Match Info
      matchType: { value: MatchType };
      matchNumber: { value: string };
      teamNumber: { value: string };
      // Entry team
      entryTeamNumber: { value: string };

      mobility: { value: string };

      // End game data
      climbStart: { value: string };
      climbEnd: { value: string };
      climbRung: { value: RungLevel };

      // Comments
      comments: { value: string };
    };

    const data = {
      teamNumber: Number(target.teamNumber.value),
      userId: session?.user.id as string,
      competitionId: selectedComp?.id as string,
      compName: selectedComp?.name as string,
      entryTeamNumber: Number(target.entryTeamNumber.value),
      matchNumber: Number(target.matchNumber.value),
      matchType: target.matchType.value,

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
    router.push("/teams");
  };

  return (
    <Protected>
      <div className="h-full py-4 px-80 lg:px-4">
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
          <div className="grid grid-cols-2 gap-10 mt-3 md:grid-cols-none md:mt-0">
            <ScoreBoard label="High Goal" id="autoHighGoal" />
            <ScoreBoard label="Low Goal" id="autoLowGoal" />
          </div>
          <h1 className="mt-4 mb-2 text-3xl font-semibold">Teleop</h1>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-none">
            <ScoreBoard label="High Goal" id="teleopHighGoal" />
            <ScoreBoard label="Low Goal" id="teleopLowGoal" />
          </div>

          <h1 className="my-4 text-3xl font-semibold ">Defense</h1>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-none md:gap-0">
            <div className="md:mb-2">
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
            <div className="flex flex-wrap">
              {defended.map((team, i) => (
                <div
                  className="px-2 py-1 my-2 mr-2 bg-gray-300 rounded-md"
                  key={i}
                >
                  {team}
                </div>
              ))}
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
            <div className="flex flex-wrap">
              {defendedBy.map((team, i) => (
                <div
                  className="px-2 py-1 my-2 mr-2 bg-gray-300 rounded-md"
                  key={i}
                >
                  {team}
                </div>
              ))}
            </div>
          </div>

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
