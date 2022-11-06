import { Entry } from "@prisma/client";
import { percentageFormat } from "../../util/calculate-stats";
import { useAtom } from "jotai";
import { selectEntryAtom } from "../../server/atoms";

export const FilterCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  const totalAuto = entry.autoHighShotsMade + entry.autoLowShotsMade;
  const totalTeleop = entry.teleopHighShotsMade + entry.teleopLowShotsMade;
  const totalShots =
    entry.autoHighShotsTotal +
    entry.autoLowShotsTotal +
    entry.teleopHighShotsTotal +
    entry.teleopLowShotsTotal;

  const [currentEntry] = useAtom(selectEntryAtom);

  return (
    <div
      className={`mr-2 py-2 mb-6 duration-200 border hover:shadow-lg hover:cursor-pointer rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white ${
        entry === currentEntry ? `shadow-xl` : `shadow-md`
      }`}
    >
      <div className="grid grid-cols-2 px-5 py-4">
        <div>
          <h1 className="text-sm">
            {entry.matchType} {entry?.matchNumber}
          </h1>
          <h1>{entry.compName}</h1>
          <h1 className="text-xl">
            Team{" "}
            <b
              className={`${
                entry === currentEntry ? `text-pink-600` : `text-black dark:text-white`
              } duration-200`}
            >
              {entry?.entryTeamNumber}
            </b>
          </h1>
          <div>
            {totalShots === 0
              ? 0
              : percentageFormat((totalAuto + totalTeleop) / totalShots)}
            % accuracy
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
