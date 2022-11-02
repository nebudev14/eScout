import { Statistics } from "../../../util/calculate-stats";

// <{ data: Entry[] }> = ({data})
export const FilterStats: React.FC<{ stats: Statistics }> = ({stats}) => {
  return (
    <div className="flex flex-col w-full px-4 py-3 bg-gray-300 rounded-lg r">
      <div className="mb-2">
        <h1 className="mb-3 text-xl">
          <b>Ball Statistics</b>
        </h1>
        <h1>{stats.ballStats.autoHighShotsMade} / {stats.ballStats.autoHighShotsTotal} auto high shots</h1>
      </div>
      <h1 className="text-xl ">
        <b>Climb  Statistics</b>
        </h1>
    </div>
  );
};
