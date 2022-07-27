import { useQuery } from "../../hooks/trpc";


export const Filter: React.FC = () => {

  const query = {
    entryTeamNumber: 1155,
  }

  const { data: entryData } = useQuery([
    "entry.get-by-filter",
    query
  ]);
  
  console.log(entryData)
  
  return (
    <>
      <input className="w-full p-3 rounded-lg shadow-md outline-none"  />
    </>
  );
}