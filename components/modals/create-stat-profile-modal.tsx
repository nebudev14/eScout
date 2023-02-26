import ModalWrapper from "@components/ui/modal-wrapper";
import { Modal } from "types/misc-types";
import { Dialog } from "@headlessui/react";
import { trpc } from "@util/trpc/trpc";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { ProfileType } from "@prisma/client";

export const CreateStatProfileModal: React.FC<Modal> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const [desiredType, setDesiredType] = useState<ProfileType>(
    ProfileType.MATCH
  );

  const util = trpc.useContext();

  const profileMutation = trpc.stat.createProfile.useMutation({
    onSuccess() {
      util.match.getById.invalidate();
    },
  });

  const createProfile = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      profileName: { value: string };
    };

    await profileMutation.mutateAsync({
      entityId: router.query.match_id as string,
      name: target.profileName.value,
      type: desiredType,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen} >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-center text-gray-900 flex flex-col"
      >
        Create Stat Profile
      </Dialog.Title>
      <div className="mt-2">
        <form onSubmit={createProfile}>
          <div className="my-2">
            <h1 className="mr-2 font-semibold">Name</h1>
            <input
              id="profileName"
              className="w-full p-2 border-2 rounded-lg outline-none"
              required
              autoComplete="off"
            />
          </div>
          <div>
            {" "}
            <Dialog.Title>Question Type</Dialog.Title>
            <select
              id="questionType"
              className="p-2 mb-3 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              onChange={(e: React.SyntheticEvent) =>
                setDesiredType(
                  (e.target as HTMLSelectElement).value as ProfileType
                )
              }
            >
              <option value={ProfileType.MATCH}>Match</option>
              <option value={ProfileType.TEAM}>Team</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Create
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};
