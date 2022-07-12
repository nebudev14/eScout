import type { NextPage } from "next";
import Link from "next/link";
import { Protected } from "../components/auth/protected";
import { useMutation, useQuery } from "../hooks/trpc";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery([
    "user.get-by-id",
    { userId: session?.user?.id as string },
  ]);

  const createInvite = useMutation("invite.create");
  const acceptInvite = useMutation("invite.accept");
  const createTeam = useMutation("team.create");

  console.log(data);

  if (isLoading || !data) return <h1>Loading...</h1>;

  return (
    <Protected>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* {data?.teamsCreated.length === 0 && data?.teamsJoined.length === 0 ? ( */}
          <>
            <h1 className="mb-4 text-3xl">You have no teams!</h1>
            <button onClick={async () => {
              await createTeam.mutateAsync({
                name: "Sciborgs",
                number: 1155
              })
            }}>
              Create Team
            </button>
            <button onClick={async () => {
              await createInvite.mutateAsync({
                userId: session?.user.id as string,
                team: 1155
              })
            }}>create invite</button>
          </>
          <button onClick={async () => {
            await acceptInvite.mutateAsync({
              id: "cl5hhiqqn1065l8uqkp7z4t7u",
              team: 1155,
              userId: session?.user.id as string
            })
          }}>
            ACCEPT INVITE AHHAHAHAHA
          </button>
        {/* ) : ( */}
          <h1>yaeh</h1>
        {/* )} */}
      </div>
      )
    </Protected>
  );
};

export default Home;
