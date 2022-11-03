import { Statistics } from "../../../util/calculate-stats";

// <{ data: Entry[] }> = ({data})
export const FilterStats: React.FC<{ stats: Statistics }> = ({ stats }) => {
  const ballStats = stats.ballStats;

  return (
    <div className="flex flex-col w-full px-4 py-3 bg-gray-300 rounded-lg ">
      <div className="mb-2">
        <h1 className="mb-2 text-2xl">
          <b>Ball Statistics</b>
        </h1>
        <h1 className="my-1 text-lg">
          <b>
            {ballStats.autoHighShotsMade +
              ballStats.autoLowShotsMade +
              ballStats.teleopHighShotsMade +
              ballStats.teleopLowShotsMade}{" "}
            /{" "}
            {ballStats.autoHighShotsTotal +
              ballStats.autoLowShotsTotal +
              ballStats.teleopHighShotsTotal +
              ballStats.teleopLowShotsTotal}
          </b>{" "}
          total shots made
        </h1>

        <div className="grid grid-cols-2 gap-6 mx-3 mt-4 mb-3">
          <div className="px-4 py-3 bg-gray-400 rounded-lg">
            <h1 className="mb-2 text-xl text-center">
              <b>Auto</b>
            </h1>
            <h1 className="text-lg">
              <b>
                {ballStats.autoHighShotsMade + ballStats.autoLowShotsMade} /{" "}
                {ballStats.autoHighShotsTotal + ballStats.autoLowShotsTotal}
              </b>{" "}
              auto shots made{" "}
            </h1>
          </div>
          <div className="px-4 py-3 bg-gray-400 rounded-lg">
            <h1 className="mb-2 text-xl text-center">
              <b>Teleop</b>
            </h1>
            <h1 className="text-lg">
              <b>
                {ballStats.teleopHighShotsMade + ballStats.teleopLowShotsMade} /{" "}
                {ballStats.teleopHighShotsTotal + ballStats.teleopLowShotsTotal}
              </b>{" "}
              teleop shots made
            </h1>
          </div>
        </div>
      </div>
      <h1 className="text-xl ">
        <b>Climb Statistics</b>
      </h1>
    </div>
  );
};
