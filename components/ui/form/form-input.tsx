import { MatchFormInput } from "../../../types/misc-types";
import { Container } from "../container";

export const FormInput: React.FC<MatchFormInput> = ({
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

  return (
    <div id={id} className="my-2">
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <input
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
          onChange={async (e: React.SyntheticEvent) =>
            updateFormState((e.target as HTMLInputElement).value)
          }
        />
      </Container>
    </div>
  );
};
