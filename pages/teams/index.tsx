import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Protected } from "../../components/auth/protected";
import { trpc, useMutation, useQuery } from "../../hooks/trpc";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

const ManageTeams: NextPage = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useQuery([
    "user.get-by-id",
    { userId: session?.user?.id as string },
  ]);

  const { invalidateQueries } = trpc.useContext();

  const mutateTeam = useMutation("team.create", {
    onSuccess() {
      invalidateQueries("user.get-by-id");
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const createTeam = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      teamName: { value: string };
      teamNum: { value: string };
    };

    await mutateTeam.mutateAsync({
      name: target.teamName.value,
      number: Number(target.teamNum.value),
    });
  };

  if (isLoading || !userData) return <h1>Loading..</h1>;

  return (
    <Protected>
      <div className="flex flex-col h-screen px-6 py-4">
        <div className="flex items-start justify-start">
          <button
            className="px-3 py-2 mb-8 text-sm text-white duration-200 bg-purple-500 rounded-md hover:bg-purple-600"
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
          <div className="grid grid-cols-1">
            {userData?.teams.map((data, i) => (
              <div
                key={i}
                className="px-6 py-4 mb-4 border shadow-md rounded-xl bg-slate-50"
              >
                <div className="mb-2">
                  <h1 className="mb-1 text-2xl">{data.team.name}</h1>
                  <h1>Team {data.team.number}</h1>
                </div>
                <h1 className="flex items-center mb-2 text-xl">
                  <GrNotes className="mr-2" /> {data.team.entries.length} scout
                  entries
                </h1>
                <h1 className="flex items-center mb-2 text-xl">
                  <FaUserFriends className="mr-2" /> {data.team.members.length}{" "}
                  members
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    Create a team
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500"></p>
                  </div>

                  <form onSubmit={createTeam}>
                    <div className="mt-4 ">
                      <h1 className="mr-2 font-semibold">Team name</h1>
                      <input
                        id="teamName"
                        className="w-full p-1 border-2 rounded-lg outline-none"
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="mt-4 ">
                      <h1 className="mr-2 font-semibold" id="teamNum">
                        Team number
                      </h1>
                      <input
                        className="w-full p-1 border-2 rounded-lg outline-none"
                        id="teamNum"
                        type="number"
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-400 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Protected>
  );
};

export default ManageTeams;
