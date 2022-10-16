const inputs = ["entryTeamNumber", "compName"];
const selects = ["matchType", "mobility"];

export const DynamicInput: React.FC<{ attribute: string }> = ({
  attribute,
}) => {
  if (inputs.includes(attribute)) {
    return (
      <input
        className="w-full p-2 shadow-md outline-none"
        autoComplete="off"
        type={attribute == "entryTeamNumber" ? "number" : "text"}
      />
    );
  }

  else if (selects.includes(attribute)) {
    return (
      <select>
        
      </select>
    );
  }

  return <></>;
};
