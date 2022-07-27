import { useQuery } from "../../hooks/trpc";


export const Filter: React.FC = () => {

  const { data: entryData } = useQuery([
    "entry.get-by-team",
    { teamNumber: 1155 }
  ]);
  
  console.log(entryData)
  
  return (
    <>
      <input className="w-full p-3 rounded-lg shadow-md outline-none"  />
    </>
  );
}