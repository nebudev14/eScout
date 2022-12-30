import { Container } from "../container";
import { Answer } from "../../../types/form-types";
import { MatchFormInput } from "../../../types/misc-types";

export const BoolInput: React.FC<MatchFormInput> = ({
  label, id, updateState
}) => {
  return (
    <div className="my-4">
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <select
          id="mobility"
          className="p-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </Container>
    </div>
  );
};
