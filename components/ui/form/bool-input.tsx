import { Container } from "../container";
import { MatchFormInput } from "../../../types/misc-types";
import { useEffect, useState } from "react";

export const BoolInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
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
    updateFormState("No");
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
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </Container>
    </div>
  );
};
