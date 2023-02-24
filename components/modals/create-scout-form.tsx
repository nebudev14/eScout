import { Dialog } from "@headlessui/react";
import { trpc } from "@util/trpc/trpc";
import { useRouter } from "next/router";
import { Modal } from "types/misc-types";
import ModalWrapper from "../ui/modal-wrapper";

export const CreateScoutFormModal: React.FC<Modal> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const util = trpc.useContext();

  const mutateMatchScout = trpc.match.createForm.useMutation({
    onSuccess() {
      util.match.getByTeam.invalidate();
    },
  });

  const mutatePitScout = trpc.pit.createPitForm.useMutation({
    onSuccess() {
      util.pit.getByTeamId.invalidate();
    },
  });

  const createForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      formName: { value: string };
      formType: { value: string };
    };

    if (target.formType.value === "match") {
      await mutateMatchScout.mutateAsync({
        name: target.formName.value,
        entityId: router.query.id as string,
      });
    } else {
      await mutatePitScout.mutateAsync({
        name: target.formName.value,
        entityId: router.query.id as string,
      });
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-center text-gray-900"
      >
        Create a Scout Form
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500"></p>
      </div>

      <form onSubmit={createForm}>
        <div className="mt-4 ">
          <h1 className="mr-2 font-semibold">Form Name</h1>
          <input
            id="formName"
            className="w-full p-2 border-2 rounded-lg outline-none"
            required
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <h1 className="mr-2 text-base font-semibold">Form Type</h1>
          <select
            id="formType"
            className="p-2 mt-2 text-sm border-2 rounded-lg outline-none "
          >
            <option value="match">Match Scout</option>
            <option value="pit">Pit Scout</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Create
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};
