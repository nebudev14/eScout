import { useAtom } from "jotai";
import { useQuery } from "../../../hooks/trpc";
import { createPitModalAtom } from "../../../server/atoms";
import { CreatePitModal } from "../../modals/create-pit";
import { BsPencilFill } from "react-icons/bs";
import Link from "next/link";

export const ManagePitScout: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [, setIsOpen] = useAtom(createPitModalAtom);
  const { data: allPitScouts } = useQuery([
    "pit.get-by-number",
    { team: teamNum },
  ]);

  return (
    <div>
      <h1 className="my-4 text-2xl">
        <b>Pit Scouts</b>
      </h1>
      <button
        className="px-6 py-2 mt-3 mb-6 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <div className="grid w-full grid-cols-3 gap-6 overflow-y-scroll md:grid-cols-1 md:gap-2">
        {allPitScouts?.map((pitScout, i) => (
          <div
            className="py-2 mb-6 border shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-700"
            key={i}
          >
            <div className="px-5 py-4">
              <div className="flex items-center justify-start mb-2">
                <h1 className="mr-auto text-xl">
                  <b>{pitScout.name}</b>
                </h1>
                <Link href={`/teams/${teamNum}/pitscout/${pitScout.id}`} passHref>
                  <BsPencilFill size={25} className="hover:cursor-pointer" />
                </Link>
              </div>
              <h1 className="text-lg">{pitScout?.questions?.length} Questions</h1>
              <h1 className="text-lg">{pitScout?.responses?.length} Responses</h1>
            </div>
          </div>
        ))}
      </div>

      <CreatePitModal />
    </div>
  );
};
