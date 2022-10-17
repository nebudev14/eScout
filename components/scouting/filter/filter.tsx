import { trpc, useQuery } from "../../../hooks/trpc";
import React, { useRef, useState } from "react";
import { AiOutlineConsoleSql, AiOutlineSearch } from "react-icons/ai";
import { Tab } from "@headlessui/react";
import type { Query } from "../../../types/filter-types";
import { DynamicInput, inputs } from "./dynamic-input";
import { MatchType } from "@prisma/client";
import { useAtom } from "jotai";
import { setSearchQueryAtom } from "../../../server/atoms";
import { FilterCard } from "../../ui/filter-card";

export const Filter: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [queryAttribute, setQueryAttribute] =
    useState<string>("entryTeamNumber");
  const [query, setQuery] = useState<Query>({});

  const { data: entryData } = useQuery(["entry.get-by-filter", query]);
  const { invalidateQueries } = trpc.useContext();

  const [currentInput] = useAtom(setSearchQueryAtom);

  const searchEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      queryType: { value: keyof Query };
    };

    // let test = query[v]
    const newQuery = query;
    newQuery[target.queryType.value] = currentInput?.userInput;
    setQuery(newQuery);
    // console.log(qu)
    invalidateQueries("entry.get-by-filter");
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4 shadow-sm justfiy-center">
        <form className="flex w-full mb-6 " onSubmit={searchEntry}>
          <div className="grid grid-cols-2">
            <select
              id="queryType"
              className="w-full h-full p-2 border-r-4 rounded-l-lg shadow-md outline-none"
              onChange={async (event: React.SyntheticEvent) => {
                setQueryAttribute((event.target as HTMLSelectElement).value);
              }}
            >
              <option value="entryTeamNumber">Team</option>
              <option value="compName">Event</option>
            </select>
            <DynamicInput attribute={queryAttribute} />
          </div>
          <button
            className="px-3 py-2 text-xl text-white rounded-r-lg shadow-md bg-cyan-500"
            type="submit"
          >
            +
          </button>
        </form>
        <div className="flex flex-wrap mb-4">
          {Object.keys(query).map((key, i) => (
            <div
              key={i}
              className="p-2 text-sm text-white bg-red-600 rounded-lg"
            >
              {key}: {query[key as keyof typeof query]}
            </div>
          ))}
        </div>
        <div className="grid w-full grid-cols-1 ">
          {entryData?.map((entry, i) => (
            <FilterCard entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
};
