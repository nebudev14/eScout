import { Entry } from "@prisma/client";
import { Statistics } from "../../../util/calculate-stats";
import { CargoStats } from "./cargo-stats";

export const SingleStats: React.FC<{ data: Entry[]; stats: Statistics }> = ({
  data,
  stats,
}) => {
  const entry = data[0];
  return (
    <div className="flex flex-col w-full px-4 py-4 overflow-y-scroll bg-gray-300 rounded-lg dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold">Team {entry?.entryTeamNumber}</h1>
      <h1 className="text-xl">{entry?.compName}</h1>
      <h1 className="mb-2 text-xl">
        {entry?.matchType} {entry?.matchNumber}
      </h1>
      <CargoStats stats={stats} />
      <div className="mt-2">
        <h1 className="text-2xl ">
          <b>Climb</b>
        </h1>
        <h1 className="my-1 text-lg">
          Climb time: <b>{entry.climbStart - entry.climbEnd}</b> seconds
        </h1>
        <h1>
          Rung: <b>{entry.climbRung} level</b>
        </h1>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl ">
          <b>Defense</b>
        </h1>
        <div className="grid grid-cols-2 gap-6 mt-3 md:grid-cols-1">
          <div className="px-4 py-3 bg-gray-400 rounded-lg dark:bg-zinc-800">
            <h1 className="text-xl font-semibold text-center">Defended</h1>
            {entry.defended.map((team, i) => (
              <h1 className="text-lg text-center" key={i}>
                Team {team}
              </h1>
            ))}
          </div>
          <div className="px-4 py-3 bg-gray-400 rounded-lg dark:bg-zinc-800">
            <h1 className="text-xl font-semibold text-center">Defended by</h1>
            {entry.defendedBy.map((team, i) => (
              <h1 className="text-lg text-center" key={i}>
                Team {team}
              </h1>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl ">
            <b>Comments</b>
          </h1>
          <div className="px-4 py-2 mt-3 text-lg bg-gray-500 rounded-lg dark:bg-zinc-800">
            {entry.comments}
          </div>
        </div>
      </div>
    </div>
  );
};
