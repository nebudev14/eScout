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
  if (Object.keys(inputs).includes(attribute)) {
    const index = Object.keys(inputs).indexOf(attribute);
    const input = Object.values(inputs).at(index);

    if (input?.element == "input") {
      return (
        <input
          className="w-full p-2 shadow-md outline-none"
          autoComplete="off"
          type={input?.inputType}
        />
      );
    } else {
      return <select></select>;
    }
  }

  return <></>;
};
