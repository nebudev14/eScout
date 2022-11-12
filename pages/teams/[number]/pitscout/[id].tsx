import { useRouter } from "next/router";
import { useQuery } from "../../../../hooks/trpc";
import { BiArrowBack } from "react-icons/bi";

const ViewPitScout: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "pit.get-by-id",
    { id: router.query.id as string },
  ]);

  const teams = data?.questions
    ?.map((e) => e.PitResponse.map((i) => i.entryTeamNumber))[0]
    ?.filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="min-h-screen px-48 py-12 md:px-4 dark:text-white">
      <BiArrowBack
        size={30}
        className="mb-4 duration-150 hover:text-pink-600 hover:cursor-pointer"
        onClick={() => router.back()}
      />
      <h1 className="mb-2 text-3xl">Pit Scouts</h1>
      <h1 className="text-xl">Team {data?.teamNumber}</h1>
      <h1 className="mb-6 text-xl">{data?.name}</h1>

      <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
        {teams?.map((entry, i) => (
          <div
            key={i}
            className="px-6 py-8 mb-6 border shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-700"
          >
            <h1 className="mb-4 text-2xl">
              <b>Team {entry}</b>
            </h1>
            {data?.questions.map((question, i) => (
              <div key={i} className="flex flex-col my-4">
                <h1 className="text-2xl">{question.prompt}</h1>
                <h1 className="text-lg">
                  {
                    question.PitResponse.filter(
                      (e) => e.entryTeamNumber === entry
                    )[0]?.response
                  }
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPitScout;
