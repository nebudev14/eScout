import { PitForm, PitQuestionType } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Protected from "../../components/auth/protected";
import { Container } from "../../components/ui/container";
import { Input } from "../../components/ui/input";
import NoTeams from "../../components/ui/no-teams";
import { useMutation, useQuery } from "../../hooks/trpc";
import { Team } from "@prisma/client";

const PitScout: NextPage = () => {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
  const { data: session } = useSession();
  const { data: userData } = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    if (userData?.teams.length !== 0) setSelectedTeam(userData?.teams[0].team);
  }, [setSelectedTeam, userData?.teams]);

  const { data, isLoading } = useQuery([
    "pit.get-by-team-id",
    { teamId: selectedTeam?.id as string },
  ]);

  const [pitScout, setSelectedPitScout] = useState<string>("");
  useEffect(() => {
    // i apologize for breaking the law
    setSelectedPitScout(data === undefined ? "" : data![0]!?.id);
  }, [setSelectedPitScout, data]);

  const submitEntry = useMutation("pit.submit-scout");

  if (userData?.teams.length === 0) return <NoTeams />;

  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as any; // i am sorry
    let results: any = []; // i am sorry squared
    data!
      ?.filter((e) => e.id === pitScout)[0]!
      ?.questions.forEach((e) => {
        const id = e.id;
        results.push({
          pitQuestionId: id,
          response: target[id].value,
          userId: session?.user?.id as string,
          entryTeamNumber: Number(target.entryTeamNumber.value),
        });
      });

    await submitEntry.mutateAsync({ data: results });
    router.push("/teams");
  };

  return (
    <Protected>
      <div className="min-h-screen py-12 px-96 dark:text-white md:px-6">
        <form onSubmit={submitData}>
          <Container>
            <label className="p-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-700 bg-slate-200 focus:outline-none focus:shadow-outline">
              Submit data to
            </label>
            <select
              id="teamNumber"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              value={selectedTeam?.number}
              onChange={(event: React.SyntheticEvent) => {
                setSelectedTeam(
                  userData?.teams.filter(
                    (e) =>
                      e.team.number ===
                      Number((event.target as HTMLSelectElement).value)
                  )[0].team
                );
              }}
            >
              {userData?.teams.map((team, i) => (
                <option key={i} value={team.team.number}>
                  {team.team.number}
                </option>
              ))}
            </select>
          </Container>
          <div className="grid grid-cols-1">
            <select
              id="pitForm"
              className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              value={pitScout}
              onChange={(event: React.SyntheticEvent) => {
                setSelectedPitScout((event.target as HTMLSelectElement).value);
              }}
            >
              {data?.map((pitscout, i) => (
                <option
                  key={i}
                  value={pitscout.id}
                  className="text-base md:inline-block md:w-full md:whitespace-pre-line md:break-words md:overflow-hidden"
                >
                  {pitscout.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1">
            <Input
              id="entryTeamNumber"
              placeholder="Team number"
              type="number"
              autoComplete="off"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:gap-2">
            {/* this is the stupidest big brain thing i've tried */}
            {data
              ?.filter((e) => e.id === pitScout)[0]
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
                      required
                      autoComplete="off"
                    />
                  ) : (
                    <select
                      id={question.id}
                      className="p-2 mt-2 text-base leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                    >
                      {question.possibleResponses.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
          </div>
          <div className="grid grid-cols-1">
            {" "}
            <button
              type="submit"
              className="p-2 mt-4 text-lg font-semibold text-white duration-200 bg-pink-600 rounded shadow focus:outline-none focus:shadow-outline hover:bg-pink-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Protected>
  );
};

export default PitScout;
