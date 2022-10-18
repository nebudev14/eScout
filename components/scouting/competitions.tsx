import { createCompModalAtom } from "../../server/atoms";
import { useAtom } from "jotai";
import { CreateCompModal } from "../modals/create-comp";
import { useQuery } from "../../hooks/trpc";


export const Competitions: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [, setIsOpen] = useAtom(createCompModalAtom);
  const { data: allComps } = useQuery([
    "comp.get-by-number",
    { team: teamNum },
  ]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="px-6 py-2 mb-6 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <div className="grid w-full grid-cols-1">
        {allComps?.map((comp, i) => (
          <div
            className="py-2 mb-6 border shadow-xl rounded-xl bg-slate-50"
            key={i}
          >
            <div className="grid grid-cols-2 px-5 py-4">
              <div>
                <h1 className="mb-2 text-lg">{comp?.name}</h1>
                <h1 className="text-xl">{comp?.entries.length} total entries</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CreateCompModal />
    </div>
  );
};
