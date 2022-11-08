import { PitForm, PitQuestionType } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Container } from "../../components/ui/container";
import { useQuery } from "../../hooks/trpc";

const PitScout: NextPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const { data: session } = useSession();
  const { data: userData } = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    setSelectedTeam(userData?.teams[0].teamNumber);
  }, [userData?.teams]);

  const { data, isLoading } = useQuery([
    "pit.get-by-number",
    { team: Number(selectedTeam) },
  ]);

  const [pitScout, setSelectedPitScout] = useState<string>("");
  useEffect(() => {
    // i apologize for breaking the law
    setSelectedPitScout(data!?.at(0)!?.id);
  });

  return (
    <div className="min-h-screen py-12 px-96 dark:text-white md:px-4">
      <Container>
        <label className="p-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-700 bg-slate-200 focus:outline-none focus:shadow-outline">
          Submit data to
        </label>
        <select
          id="teamNumber"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          value={selectedTeam}
          onChange={(event: React.SyntheticEvent) => {
            setSelectedTeam(Number((event.target as HTMLSelectElement).value));
          }}
        >
          {userData?.teams.map((team, i) => (
            <option key={i} value={team.teamNumber}>
              {team.teamNumber}
            </option>
          ))}
        </select>
      </Container>
      <Container>
        <label className="p-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-700 bg-slate-200 focus:outline-none focus:shadow-outline">
          Pit Form
        </label>
        <select
          id="pitForm"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          value={pitScout}
          onChange={(event: React.SyntheticEvent) => {
            setSelectedPitScout((event.target as HTMLSelectElement).value);
          }}
        >
          {data?.map((pitscout, i) => (
            <option key={i} value={pitscout.id}>
              {pitscout.name}
            </option>
          ))}
        </select>
      </Container>

      <div className="grid grid-cols-1 gap-6 mt-6 md:gap-2">
        {/* this is the stupidest big brain thing i've tried */}
        {data
          ?.filter((e) => e.id === pitScout)
          .at(0)
          ?.questions?.map((question, i) => (
            <div
              key={i}
              className="px-5 py-3 my-2 mr-2 duration-200 border hover:shadow-lg rounded-xl bg-slate-50 dark:bg-zinc-900 dark:border-zinc-600 dark:text-white"
            >
              <h1 className="mb-2 text-xl">
                <b>{question.prompt}</b>
              </h1>
              {question.type === PitQuestionType.TEXT ? (
                <input
                  id={question.id}
                  className="w-full py-2 mb-2 bg-transparent border-b-2 outline-none"
                  autoComplete="off"
                />
              ) : (
                "balls"
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PitScout;
