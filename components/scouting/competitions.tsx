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
    <div>
      <button
        className="px-6 py-2 mb-6 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      {allComps?.map((comp, i) => (
        <div
          className="px-5 py-6 mb-6 border shadow-xl rounded-xl bg-slate-50"
          key={i}
        >
          <h1 className="text-xl">
            {comp?.name}
          </h1>
        </div>
      ))}

      <CreateCompModal />
    </div>
  );
};
