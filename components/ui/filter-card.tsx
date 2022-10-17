import { Entry } from "@prisma/client";

export const FilterCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className="py-2 mb-6 border shadow-xl rounded-xl bg-slate-50">
      <div className="grid grid-cols-2 px-5 py-4">
        <div>
          <h1 className="text-sm">
            {entry.matchType} {entry?.matchNumber}
          </h1>
          <h1>{entry.compName}</h1>
          <h1 className="text-xl">Team {entry?.entryTeamNumber}</h1>
        </div>
        <div className="flex flex-col text-right">
          <div>
            <b>{entry.autoHighShotsMade + entry?.autoLowShotsMade}</b> total
            auto goals
          </div>
          <div>
            <b>{entry.teleopHighShotsMade + entry.teleopLowShotsMade}</b> total
            teleop goals
          </div>
          <div>
            <b>
              {(
                ((entry.autoHighShotsMade +
                  entry.autoLowShotsMade +
                  entry.teleopHighShotsMade +
                  entry.teleopHighShotsMade) /
                  (entry.autoHighShotsTotal +
                    entry.autoHighShotsMade +
                    entry.teleopHighShotsMade +
                    entry.teleopLowShotsTotal)) *
                100
              ).toFixed(2)}
            </b>
            % accuracy
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
