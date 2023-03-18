import type { NextPage } from "next";
import Protected from "@components/auth/protected";
import NoTeams from "@components/ui/no-teams";
import { trpc } from "@util/trpc/trpc";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session)
  const { data, isLoading } = trpc.user.getUser.useQuery();


  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <Protected>
      <div className="flex flex-col items-center justify-center h-screen dark:text-white">
        {data?.teams.length === 0 ? <NoTeams /> : <h1>yaeh</h1>}
      </div>
      )
    </Protected>
  );
};

export default Home;
