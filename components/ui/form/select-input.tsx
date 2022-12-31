import { useEffect } from "react";
import { MatchFormInput } from "../../../types/misc-types";
import { Container } from "../container";

export const SelectInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
  options,
}) => {
  const updateFormState = (value: string) => {
    if (updateState) {
      updateState({
        questionId: id,
        slot1: value,
      });
    }
  };

  useEffect(() => {
    updateFormState(options?.[0] as string);
  }, [updateFormState]);

  return (
    <div className="my-4">
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <select
          id="mobility"
          className="p-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline"
          onChange={async (e: React.SyntheticEvent) =>
            updateFormState((e.target as HTMLSelectElement).value)
          }
        >
          {options?.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Container>
    </div>
  );
};
