import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Protected from "../../components/auth/protected";
import { useQuery } from "../../hooks/trpc";
import { FaUserFriends } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { CreateTeamModal } from "../../components/modals/create-team";
import { useState } from "react";
import { trpc } from "../../util/trpc/trpc";

const ManageTeams: NextPage = () => {

  const { data: userData, isLoading } = trpc.user.getUser.useQuery();

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || !userData)
    return (
      <h1 className="flex items-center justify-center min-h-screen text-2xl dark:text-white">
        Loading..
      </h1>
    );

  return (
    <Protected>
      <div className="flex flex-col h-screen px-6 py-4 dark:text-white">
        <div className="flex items-start justify-start">
          <button
            className="px-3 py-2 mb-8 text-sm text-white duration-200 bg-pink-600 rounded-md hover:bg-pink-700"
            onClick={() => setIsOpen(true)}
          >
            Create
          </button>
        </div>
        {userData?.teams.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className="mb-4 text-2xl">You don&apos;t have any teams!</h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
            {userData?.teams.map((data, i) => (
              <a
                key={i}
                href={`/teams/${data.teamId}`}
                className="duration-100 border shadow-md dark:border-none dark:text-white rounded-xl dark:bg-zinc-900 bg-slate-50 hover:shadow-lg"
              >
                <div className="px-6 py-4">
                  <div className="mb-2">
                    <h1 className="mb-1 text-2xl">{data.team.name}</h1>
                    <h1>Team {data.team.number}</h1>
                  </div>
                  <h1 className="flex items-center mb-2 text-xl">
                    <CgNotes className="mr-2 text-pink-500" />{" "}
                    {data.team.entries.filter((e) => !e.prescout).length} scout
                    entries
                  </h1>
                  <h1 className="flex items-center mb-2 text-xl ">
                    <FaUserFriends className="mr-2 text-cyan-500" />{" "}
                    {data.team.members.length} members
                  </h1>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Protected>
  );
};

export default ManageTeams;
