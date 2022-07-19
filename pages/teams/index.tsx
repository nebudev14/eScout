import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Protected } from "../../components/auth/protected";
import { useQuery } from "../../hooks/trpc";
import { useState } from "react";
import { Dialog } from "@headlessui/react";


const ManageTeams: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery([
    "user.get-by-id",
    { userId: session?.user?.id as string },
  ]);

  const [isOpen, setIsOpen] = useState(true);

  if (isLoading || !data) return <h1>Loading..</h1>;
  
  
  return (
    <Protected>
      <div className="flex flex-col h-screen px-6 py-4">
        <div className="flex items-start justify-start">
          <button className="px-3 py-2 mb-8 text-2xl text-white duration-200 bg-purple-500 rounded-md hover:bg-purple-600">
            Create
          </button>
        </div>
        {data?.teamsCreated.length === 0 && data?.teamsJoined.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className="mb-4 text-2xl">You don&apos;t have any teams!</h1>
          </div>
        ) : (
          <h1>sike</h1>
        )}
      </div>
    </Protected>
  );
};

export default ManageTeams;
