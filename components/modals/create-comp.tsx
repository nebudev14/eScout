import { trpc } from "@util/trpc/trpc";
import { useRouter } from "next/router";
import { Modal } from "../../types/misc-types";
import ModalWrapper from "../ui/modal-wrapper";

export const CreateCompModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const util = trpc.useContext();

  const mutateComp = trpc.comp.createComp.useMutation({
    onSuccess() {
      util.comp.getComp.invalidate();
    }
  })

  const createComp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      compName: { value: string };
    };

    await mutateComp.mutateAsync({
      entityId: router.query.id as string,
      name: target.compName.value,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={createComp}>
        <div className="mt-4 ">
          <h1 className="mr-2 font-semibold">Competition name</h1>
          <input
            id="compName"
            className="w-full p-2 border-2 rounded-lg outline-none"
            required
            autoComplete="off"
          />
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
