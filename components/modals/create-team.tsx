import { Dialog, Tab } from "@headlessui/react";
import { trpc } from "@util/trpc/trpc";
import { Modal } from "types/misc-types";
import ModalWrapper from "../ui/modal-wrapper";


export const CreateTeamModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const util = trpc.useContext();

  const mutateTeam = trpc.team.createTeam.useMutation({
    onSuccess() {
      util.user.getUser.invalidate();
    }
  })

  const mutateJoinTeam = trpc.team.acceptInvite.useMutation({
    onSuccess() {
      util.user.getUser.invalidate();
    }
  })

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

  const joinTeam = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      inviteId: { value: string };
    };

    await mutateJoinTeam.mutateAsync({
      inviteId: target.inviteId.value,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Tab.Group>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-center text-gray-900"
        >
          <Tab.List className="grid grid-cols-2">
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-6 py-2 outline-none border-b-2 border-pink-600"
                  : "px-6 py-2"
              }
            >
              Create
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-6 py-2 outline-none border-b-2 border-pink-600"
                  : "px-6 py-2"
              }
            >
              Join
            </Tab>
          </Tab.List>
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500"></p>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <form onSubmit={createTeam}>
              <div className="mt-4 ">
                <h1 className="mr-2 font-semibold">Team name</h1>
                <input
                  id="teamName"
                  className="w-full p-2 border-2 rounded-lg outline-none"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mt-4 ">
                <h1 className="mr-2 font-semibold" id="teamNum">
                  Team number
                </h1>
                <input
                  className="w-full p-2 border-2 rounded-lg outline-none"
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
          </Tab.Panel>
          <Tab.Panel>
            <form onSubmit={joinTeam}>
              <div className="mt-4 ">
                <h1 className="mr-2 font-semibold">Invite ID</h1>
                <input
                  id="inviteId"
                  className="w-full p-2 border-2 rounded-lg outline-none"
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
                  Join
                </button>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </ModalWrapper>
  );
};
