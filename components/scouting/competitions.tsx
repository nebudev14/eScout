import { createCompModalAtom } from "../../server/atoms";
import { useAtom } from "jotai";
import { CreateCompModal } from "../modals/create-comp";
import { useQuery } from "../../hooks/trpc";
import { calculateStats, sum } from "../../util/calculate-stats";

export const Competitions: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [, setIsOpen] = useAtom(createCompModalAtom);
  const { data: allComps } = useQuery([
    "comp.get-by-number",
    { team: teamNum },
  ]);

  return (
    <div className="">
      <button
        className="px-6 py-2 mt-3 mb-6 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <div className="grid w-full grid-cols-3 gap-6 overflow-y-scroll md:grid-cols-1 md:gap-2">
        {allComps?.map((comp, i) => (
          <div
            className="py-2 mb-6 border shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-700"
            key={i}
          >
            <div className="px-5 py-4 ">
              <div>
                <h1 className="text-2xl">{comp?.name}</h1>
                <h1 className="mb-1 text-xl">
                  {comp?.entries.length} total entries
                </h1>

                <div className="text-lg">
                  <h1>
                    <b>
                      {sum(comp?.entries, "autoHighShotsMade") +
                        sum(comp?.entries, "autoLowShotsMade")}{" "}
                    </b>
                    total auto shots
                  </h1>
                  <h1>
                    <b>
                      {sum(comp?.entries, "teleopHighShotsMade") +
                        sum(comp?.entries, "teleopLowShotsMade")}{" "}
                    </b>
                    total teleop shots
                  </h1>

                  <h1>
                    <b>
                      {sum(comp?.entries, "climbStart") -
                        sum(comp?.entries, "climbEnd")}{" "}
                    </b>
                    total seconds of climb
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreateCompModal />
    </div>
  );
};
