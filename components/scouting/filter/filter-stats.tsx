import { percentageFormat, Statistics } from "../../../util/calculate-stats";
import { NumberStats } from "../stats/number-stats";

// <{ data: Entry[] }> = ({data})
export const FilterStats: React.FC<{ stats: Statistics }> = ({ stats }) => {
  return (
    <NumberStats stats={stats} />
  );
};
