import { createCompModalAtom } from "../../server/atoms";
import { useAtom } from "jotai";
import { CreateCompModal } from "../modals/create-comp";

export const Competitions: React.FC = () => {
  const [, setIsOpen] = useAtom(createCompModalAtom);

  return (
    <div>
      <button
        className="w-full px-6 py-2 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      
      <CreateCompModal />
    </div>
  );
};
