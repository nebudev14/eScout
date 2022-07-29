import { useQuery } from "../../hooks/trpc";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Filter: React.FC = () => {


  const teamNumber = useRef<HTMLInputElement>(null);
  const eventName = useRef<HTMLInputElement>(null);
  
  const input = {};

  const { data: entryData } = useQuery(["entry.get-by-filter", input]);

  return (
    <>
      {/* <div className="flex flex-wrap mb-4">
        {Object.keys(query).map((key, i) => (
          <div
            key={i}
            className="p-2 mx-2 my-2 text-sm text-white bg-red-400 rounded-lg"
          >
            {key}: {query[key as keyof typeof query].toString()}
          </div>
        ))}
      </div> */}
      <div className="flex items-center mb-4 shadow-sm justfiy-center">
        <form className="flex items-center justify-center">
          <input
            className="w-full p-2 border-r-4 rounded-l-lg shadow-md outline-none"
            ref={teamNumber}
            type="number"
            placeholder="Team number"
            required
          />
          <input
            className="w-full p-2 shadow-md outline-none"
            ref={eventName}
            placeholder="Event name"
            
            required
          />
          <button className="p-2 text-xl text-white bg-pink-600 rounded-r-lg shadow-md" type="submit">
            <AiOutlineSearch />
          </button>
        </form>
      </div>
    </>
  );
};
