import { useAtom } from "jotai";
import { createQuestionModalAtom } from "../../server/atoms";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc, useMutation } from "../../hooks/trpc";
import { useRouter } from "next/router";
import { PitQuestionType } from "@prisma/client";
import { BsFillTrashFill } from "react-icons/bs";

export const CreateQuestionModal: React.FC = () => {
  const router = useRouter();
  const { invalidateQueries } = trpc.useContext();

  const [isOpen, setIsOpen] = useAtom(createQuestionModalAtom);
  const [questionType, setQuestionType] = useState<PitQuestionType>(
    PitQuestionType.TEXT
  );
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  // For entering in new options
  const [currentOption, setCurrentOption] = useState<string>("");

  const mutateComp = useMutation("pit.add-question", {
    onSuccess() {
      invalidateQueries("pit.get-by-number");
    },
  });

  const createComp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      compName: { value: string };
    };

    // await mutateComp.mutateAsync({
    //   name: target.compName.value,
    //   team: Number(router.query.number),
    // });
  };

  return (
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
                  Add a question
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div>

                <form onSubmit={createComp}>
                  <div className="mt-4 ">
                    <h1 className="mr-2 font-semibold">Question</h1>
                    <input
                      id="questionName"
                      className="w-full p-2 border-2 rounded-lg outline-none"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-4 ">
                    <h1 className="mr-2 font-semibold">Question type</h1>
                    <select
                      id="questionType"
                      className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                      value={questionType}
                      onChange={(event: React.SyntheticEvent) => {
                        setQuestionType(
                          (event.target as HTMLSelectElement)
                            .value as PitQuestionType
                        );
                      }}
                    >
                      <option value={PitQuestionType.TEXT}>Text input</option>
                      <option value={PitQuestionType.SELECT}>Selection</option>
                    </select>
                  </div>
                  {questionType === PitQuestionType.SELECT ? (
                    <div className="mt-4">
                      <div className="flex items-center mb-3">
                        <h1 className="mr-2 font-semibold">Options</h1>
                        <input
                          className="p-1 border-2 rounded-l-lg outline-none"
                          onChange={(event: React.SyntheticEvent) =>
                            setCurrentOption(
                              (event.target as HTMLSelectElement)
                                .value as string
                            )
                          }
                        />
                        <button
                          formNoValidate
                          className="px-3 py-1 text-lg text-white rounded-r-lg bg-cyan-500"
                          onClick={() => {
                            if (currentOption !== "") {
                              setSelectOptions([
                                ...selectOptions,
                                currentOption,
                              ]);
                              setCurrentOption("");
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                      <ul className="px-4 list-disc">
                        {selectOptions.map((option, i) => (
                          <div className="flex items-center text-center">
                            <li key={i} className="my-1 text-lg">
                              {option}
                            </li>
                            <BsFillTrashFill
                              size={20}
                              className="ml-2 text-red-500 duration-150 hover:cursor-pointer hover:text-red-600"
                              onClick={() => setSelectOptions(selectOptions.filter(e => e!== option))}
                            />
                          </div>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
  );
};
