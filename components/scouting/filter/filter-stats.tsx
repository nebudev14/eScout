import { percentageFormat, Statistics } from "../../../util/calculate-stats";

// <{ data: Entry[] }> = ({data})
export const FilterStats: React.FC<{ stats: Statistics }> = ({ stats }) => {
  const ballStats = stats.ballStats;

  const totalTeleopShotsMade =
    ballStats.teleopHighShotsMade + ballStats.teleopLowShotsMade;
  const totalTeleopShots =
    ballStats.teleopHighShotsTotal + ballStats.teleopLowShotsTotal;

  const totalAutoShotsMade =
    ballStats.autoHighShotsMade + ballStats.autoLowShotsMade;
  const totalAutoShots =
    ballStats.autoHighShotsTotal + ballStats.autoLowShotsTotal;

  const totalBallsMade = totalTeleopShotsMade + totalAutoShotsMade;
  const totalBallsShot = totalTeleopShots + totalAutoShots;

  return (
    <div className="flex flex-col w-full px-4 py-3 bg-gray-300 rounded-lg ">
      <div className="mb-2">
        <h1 className="mb-2 text-2xl">
          <b>Ball Statistics</b>
        </h1>
        <h1 className="my-1 text-lg">
          <b>
            {totalBallsMade} / {totalBallsMade}
          </b>{" "}
          total shots made ({percentageFormat(totalBallsMade / totalBallsShot)}
          %)
        </h1>
        <h1 className="text-md">
          <b>
            {ballStats.autoHighShotsMade + ballStats.teleopHighShotsMade} /{" "}
            {ballStats.autoHighShotsTotal + ballStats.teleopHighShotsTotal}
          </b>{" "}
          total high shots (average {ballStats.averageHighShots} per game)
        </h1>
        <h1 className="text-md">
          <b>
            {ballStats.autoLowShotsMade + ballStats.teleopLowShotsMade} /{" "}
            {ballStats.autoLowShotsTotal + ballStats.teleopLowShotsTotal}
          </b>{" "}
          total low shots (average{" "}
          {percentageFormat(ballStats.autoLowPercentage)} per game)
        </h1>

        <div className="grid grid-cols-2 gap-6 mx-3 mt-4 mb-3">
          <div className="px-4 py-3 bg-gray-400 rounded-lg">
            <h1 className="mb-1 text-xl text-center">
              <b>Auto</b>
            </h1>
            <h1 className="text-lg">
              <b>
                {ballStats.autoHighShotsMade + ballStats.autoLowShotsMade} /{" "}
                {ballStats.autoHighShotsTotal + ballStats.autoLowShotsTotal}
              </b>{" "}
              auto shots (
              {percentageFormat(totalAutoShotsMade / totalAutoShots)}
              %)
            </h1>
            <h2>
              <b>
                {ballStats.autoHighShotsMade} / {ballStats.autoHighShotsTotal}
              </b>{" "}
              auto high shots ({(ballStats.autoHighPercentage * 100).toFixed(2)}
              %)
            </h2>
            <h2>
              <b>
                {ballStats.autoLowShotsMade} / {ballStats.autoLowShotsTotal}
              </b>{" "}
              auto low shots ({(ballStats.autoLowPercentage * 100).toFixed(2)}%)
            </h2>
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
              teleop shots (
              {percentageFormat(totalTeleopShotsMade / totalTeleopShots)}
              %)
            </h1>
            <h2>
              <b>
                {ballStats.teleopHighShotsMade} /{" "}
                {ballStats.teleopHighShotsTotal}
              </b>{" "}
              teleop high shots (
              {(ballStats.teleopHighPercentage * 100).toFixed(2)}%)
            </h2>
            <h2>
              <b>
                {ballStats.teleopLowShotsMade} / {ballStats.teleopLowShotsTotal}
              </b>{" "}
              teleop low shots (
              {(ballStats.teleopLowPercentage * 100).toFixed(2)}%)
            </h2>
          </div>
        </div>
      </div>
      <h1 className="text-xl ">
        <b>Climb Statistics</b>
      </h1>
    </div>
  );
};
