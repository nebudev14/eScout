import { trpc, useQuery } from "../../hooks/trpc";
import React, { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Filter: React.FC<{ teamNum: number }> = ({teamNum}) => {
  interface Query {
    teamNumber: number
    entryTeamNumber?: number;
    eventName?: string;
  }
  
  const teamNumber = useRef<HTMLInputElement>(null);
  const eventName = useRef<HTMLInputElement>(null);
  
  const [input, setInput] = useState({
    teamNumber: teamNum
  });
  const { data: entryData } = useQuery(["entry.get-by-filter", input]);
  const { invalidateQueries } = trpc.useContext();

  const searchEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newInput: Query = {
      teamNumber: teamNum
    }
    if (Number(teamNumber.current?.value) !== 0) newInput.entryTeamNumber = Number(teamNumber.current?.value);
    if (eventName.current?.value !== "") newInput.eventName = eventName.current?.value;
    setInput(newInput);
    invalidateQueries("entry.get-by-filter");
    console.log(entryData)
  };

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
      <div className="flex flex-col items-center mb-4 shadow-sm justfiy-center">
        <form className="flex items-center justify-center mb-6" onSubmit={searchEntry}>
          <input
            className="w-full p-2 border-r-4 rounded-l-lg shadow-md outline-none"
            ref={teamNumber}
            type="number"
            placeholder="Team number"
            autoComplete="off"
          />
          <input
            className="w-full p-2 shadow-md outline-none"
            ref={eventName}
            placeholder="Event name"
            autoComplete="off"
          />
          <button
            className="p-2 text-xl text-white bg-pink-600 rounded-r-lg shadow-md"
            type="submit"
          >
            <AiOutlineSearch />
          </button>
        </form>
        <div className="grid grid-cols-1">
          {entryData?.map((entry, i) => (
            <div key={i}>
              <h1>{entry.autoHighShotsMade}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
