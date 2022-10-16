const inputs = ["entryTeamNumber", "compName"];
const selects = ["matchType", "mobility"]

export const DynamicInput: React.FC<{ attribute: string }> = ({
  attribute
}) => {
  if (inputs.includes(attribute)) {
    return (
      <></>
    );
  }

  return <></>
}