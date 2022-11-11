import { Entry, User } from "@prisma/client";
import { percentageFormat } from "../../util/calculate-stats";
import { useAtom } from "jotai";
import { selectEntryAtom } from "../../server/atoms";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import { trpc, useMutation } from "../../hooks/trpc";

export const FilterCard: React.FC<{
  entry: Entry;
  user: User;
  isAdmin: boolean;
}> = ({ entry, user, isAdmin }) => {
  const totalAuto = entry.autoHighShotsMade + entry.autoLowShotsMade;
  const totalTeleop = entry.teleopHighShotsMade + entry.teleopLowShotsMade;
  const totalShots =
    entry.autoHighShotsTotal +
    entry.autoLowShotsTotal +
    entry.teleopHighShotsTotal +
    entry.teleopLowShotsTotal;

  const [currentEntry] = useAtom(selectEntryAtom);

  const { invalidateQueries } = trpc.useContext();

  const deleteEntry = useMutation("entry.delete-entry", {
    onSuccess() {
      invalidateQueries("entry.get-by-filter");
    },
  });

  return (
    <div
      className={`mr-2 py-2 my-2 duration-200 border hover:shadow-lg hover:cursor-pointer rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white ${
        entry === currentEntry ? `shadow-xl` : `shadow-md`
      }`}
    >
      <div className="grid grid-cols-2 px-5 pt-4 pb-2">
        <div>
          <h1 className="text-sm">
            {entry.matchType} {entry?.matchNumber}
          </h1>
          <h1>{entry.compName}</h1>
          <h1 className="text-xl">
            Team{" "}
            <b
              className={`${
                entry === currentEntry
                  ? `text-pink-600`
                  : `text-black dark:text-white`
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
      <div className="flex items-center px-5 pb-2">
        <Image
          src={user.image as string}
          width={35}
          height={35}
          className="rounded-full"
          alt={`${user.name} image`}
        />
        <h1 className="ml-2 mr-auto">{user.name}</h1>
        {isAdmin ? (
          <BsFillTrashFill
            size={20}
            className="ml-2 text-white duration-150 hover:text-red-500 hover:cursor-pointer"
            onClick={async () => {
              await deleteEntry.mutateAsync({
                id: entry?.id,
              });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
