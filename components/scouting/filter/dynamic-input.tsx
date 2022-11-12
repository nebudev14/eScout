import { useAtom } from "jotai";
import { setSearchQueryAtom } from "../../../server/atoms";

export const inputs = {
  entryTeamNumber: {
    element: "input",
    inputs: "number",
  },
  compName: {
    element: "input",
    inputs: "text",
  }
};

export const DynamicInput: React.FC<{ attribute: string }> = ({
  attribute,
}) => {
  const [, setCurrentInput] = useAtom(setSearchQueryAtom);

  if (Object.keys(inputs).includes(attribute)) {
    const index = Object.keys(inputs).indexOf(attribute);
    let inputElements: any[] = [];
    Object.keys(inputs).forEach(e =>inputElements.push(inputs[e as keyof typeof inputs]))
    const input = inputElements[index];

    if (input?.element == "input") {
      return (
        <input
          className="w-full p-2 shadow-md outline-none dark:text-white dark:bg-zinc-900"
          autoComplete="off"
          type={input?.inputs}
          onChange={async (event: React.SyntheticEvent) => {
            const inpValue =
              input?.inputs == "number"
                ? Number((event.target as HTMLInputElement).value)
                : (event.target as HTMLInputElement).value;
            setCurrentInput({
              userInput: inpValue == 0 || inpValue == "" ? undefined : inpValue,
              comparable: false,
            });
          }}
        />
      );
    } else {
      return (
        <select>
          
        </select>
      );
    }
  }

  return <></>;
};
