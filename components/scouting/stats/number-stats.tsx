import { Statistics } from "../../../util/calculate-stats";
import { CargoStats } from "./cargo-stats";

export const NumberStats: React.FC<{ stats: Statistics }> = ({ stats }) => {
  const climbStats = stats.climbStats;

  return (
    <div className="flex flex-col w-full px-4 py-3 bg-gray-300 rounded-lg dark:bg-zinc-900 ">
      <CargoStats stats={stats} />
      <h1 className="text-2xl ">
        <b>Climb Statistics</b>
      </h1>
      <h1 className="my-1 text-md">
        Average climb time: <b>{climbStats.averageClimbTime.toFixed(2)}</b>{" "}
        seconds
      </h1>
      <div className="px-4 py-3 mt-2 bg-gray-400 rounded-lg dark:bg-zinc-800">
        <h1>
          No Climb: <b>{climbStats.noClimb}</b> matches
        </h1>
        <h1>
          Low Rung: <b>{climbStats.lowClimb}</b> matches
        </h1>
        <h1>
          Mid Rung: <b>{climbStats.midClimb}</b> matches
        </h1>
        <h1>
          High Rung: <b>{climbStats.highClimb}</b> matches
        </h1>
        <h1>
          Traversal Rung: <b>{climbStats.travClimb}</b> matches
        </h1>
      </div>
    </div>
  );
};
