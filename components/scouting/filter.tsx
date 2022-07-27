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
      <div className="flex items-center mb-4 shadow-sm justfiy-center">
        <select className="h-full p-2 rounded-l-lg">
          <option>
            Team
          </option>
        </select>
        <input className="w-full p-2 outline-none"  />
        <button className="p-2 text-white bg-pink-600 rounded-r-lg">+</button>
      </div>
      <div className="flex flex-wrap">
        {Object.keys(query).map((key, i) => (
          <div key={i} className="p-2 text-sm text-white bg-red-400 rounded-lg">
            {key}: {query[key as keyof typeof query]}
          </div>
        ))}
      </div>
    </>
  );
}