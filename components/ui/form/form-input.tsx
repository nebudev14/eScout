import { ReactDOM } from "react";
import { Container } from "../container";

export const FormInput: React.FC<{ label: string; id: string }> = ({
  label,
  id,
}) => {
  return (
    <div id={id}>
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-zinc-600 focus:outline-none focus:shadow-outline">
          Mobility
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
