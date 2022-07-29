import { useQuery } from "../../hooks/trpc";
import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Filter: React.FC = () => {

  interface Query {
    entryTeamNumber?: number;
    eventName?: string;
  }

  const optionRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const input: Query = {};

  const { data: entryData } = useQuery(["entry.get-by-filter", input]);
  console.log(input)

  // console.log(optionRef.current?.value)

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
        <select className="h-full p-2 rounded-l-lg" ref={optionRef}>
          <option value="entryTeamNumber">Team</option>
          <option value="eventName">Event</option>
        </select>
        <input className="w-full p-2 outline-none" ref={inputRef} required />
        <button
          className="p-2 text-xl text-white bg-pink-600 rounded-r-lg"
          onClick={() => {
            switch(optionRef.current?.value) {
              case "entryTeamNumber": {
                if(!isNaN(Number(inputRef.current?.value))) input.entryTeamNumber = Number(inputRef.current?.value)
                break;
              }
              case "eventName": {
                input.eventName = inputRef.current?.value
                break;
              }

            }
            console.log(input)
          }}
        >
          <AiOutlineSearch />
        </button>
      </div>
    </>
  );
};

