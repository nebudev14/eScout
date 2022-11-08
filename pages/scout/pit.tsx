import { PitForm } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Container } from "../../components/ui/container";
import { useQuery } from "../../hooks/trpc";

const PitScout: NextPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const [pitScout, setSelectedPitScout] = useState<string | undefined>(undefined);
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

  return (
    <div className="min-h-screen py-12 px-96 dark:text-white">
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
            setSelectedPitScout((event.target as HTMLSelectElement).value)
          }}
        >
          {data?.map((pitscout, i) => (
            <option key={i} value={pitscout.id}>
              {pitscout.name}
            </option>
          ))}
        </select>
      </Container>
    </div>
  );
};

export default PitScout;
