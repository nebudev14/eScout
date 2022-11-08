import type { NextPage } from "next";
import Link from "next/link";
import { Protected } from "../components/auth/protected";
import { useMutation, useQuery } from "../hooks/trpc";
import { useSession } from "next-auth/react";
import NoTeams from "../components/ui/no-teams";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery([
    "user.get-by-id",
    { userId: session?.user?.id as string },
  ]);

  const createTeam = useMutation("team.create");

  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <Protected>
      <div className="flex flex-col items-center justify-center h-screen dark:text-white">
        {data?.teams.length === 0 ? (
          <NoTeams />
        ) : (
          <h1>yaeh</h1>
        )}
      </div>
      )
    </Protected>
  );
};

export default Home;
