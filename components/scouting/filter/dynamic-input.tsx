import { useAtom } from "jotai";
import { setSearchQueryAtom } from "../../../server/atoms";

export const inputs = {
  entryTeamNumber: {
    element: "input",
    inputType: "number",
  },
  compName: {
    element: "input",
    inputType: "text",
  },
};

export const DynamicInput: React.FC<{ attribute: string }> = ({
  attribute,
}) => {
  const [, setCurrentInput] = useAtom(setSearchQueryAtom);

  if (Object.keys(inputs).includes(attribute)) {
    const index = Object.keys(inputs).indexOf(attribute);
    const input = Object.values(inputs).at(index);

    if (input?.element == "input") {
      return (
        <input
          className="w-full p-2 shadow-md outline-none"
          autoComplete="off"
          type={input?.inputType}
          onChange={async (event: React.SyntheticEvent) => {
            const inpValue =
              input?.inputType == "number"
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
      return <select></select>;
    }
  }

  return <></>;
};
