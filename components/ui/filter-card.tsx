import { Entry } from "@prisma/client";

export const FilterCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  const totalAuto = entry.autoHighShotsMade + entry.autoLowShotsMade;
  const totalTeleop = entry.teleopHighShotsMade + entry.teleopLowShotsMade;
  const totalShots =
    entry.autoHighShotsTotal +
    entry.autoLowShotsTotal +
    entry.teleopHighShotsTotal +
    entry.teleopLowShotsTotal;
  return (
    <div className="py-2 mb-6 border shadow-xl rounded-xl bg-slate-50">
      <div className="grid grid-cols-2 px-5 py-4">
        <div>
          <h1 className="text-sm">
            {entry.matchType} {entry?.matchNumber}
          </h1>
          <h1>{entry.compName}</h1>
          <h1 className="text-xl">
            Team <b>{entry?.entryTeamNumber}</b>
          </h1>
          <div>
            {(((totalAuto + totalTeleop) / totalShots) * 100).toFixed(2)}%
            accuracy
          </div>
        </div>

        <div className="flex flex-col text-right">
          <div>
            <b>{entry.autoHighShotsMade + entry?.autoLowShotsMade}</b> auto
            goals
          </div>
          <div>
            <b>{entry.teleopHighShotsMade + entry.teleopLowShotsMade}</b> teleop
            goals
          </div>
          <div>
            {entry.climbEnd - entry.climbStart === 0
              ? "No climb"
              : entry.climbStart - entry.climbEnd + " second climb"}
          </div>
          <div>{entry.climbRung} Rung</div>
        </div>
      </div>
    </div>
  );
};
