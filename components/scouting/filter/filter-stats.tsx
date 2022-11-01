import { Statistics } from "../../../util/calculate-stats";

// <{ data: Entry[] }> = ({data})
export const FilterStats: React.FC<{ stats: Statistics }> = (
  stats,
) => {
  return (
    <div className="flex flex-col w-full px-4 py-3 bg-gray-300 rounded-lg r">
      <div className="mb-2">
        <h1>Ball Statistics</h1>
      </div>
      <div>
        <h1>Climb Statistics</h1>
      </div>
    </div>
  );
};
