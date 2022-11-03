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
import { FilterStats } from "./filter-stats";
import { calculateStats } from "../../../util/calculate-stats";

export const Filter: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  const [queryAttribute, setQueryAttribute] =
    useState<string>("entryTeamNumber");
  const [query, setQuery] = useState<Query>({});

  const { data: entryData } = useQuery([
    "entry.get-by-filter",
    { teamNumber: teamNum, query },
  ]);
  const { invalidateQueries } = trpc.useContext();

  const [currentInput] = useAtom(setSearchQueryAtom);

  const searchEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      queryType: { value: keyof Query };
    };

    const newQuery = query;

    newQuery[target.queryType.value] = currentInput?.userInput;
    setQuery(newQuery);
    invalidateQueries("entry.get-by-filter");
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <form className="flex w-full mt-4" onSubmit={searchEntry}>
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
          {Object.keys(query)
            .filter((e) => query[e as keyof typeof query] !== undefined)
            .map((key, i) => (
              <div
                key={i}
                className="flex p-2 mb-2 text-sm text-white bg-red-600 rounded-lg"
              >
                <div className="px-1">
                  {key}: {query[key as keyof typeof query]}
                </div>
                <button
                  className="pl-2 bg-red-600"
                  onClick={async (event: React.SyntheticEvent) => {
                    const current = query;
                    current[key as keyof typeof query] = undefined;
                    setQuery(current);
                    invalidateQueries("entry.get-by-filter");
                  }}
                >
                  X
                </button>
              </div>
            ))}
        </div>
        <div className={`grid grid-cols-1 overflow-y-scroll ${entryData!?.length > 2 ? `h-[35rem]` : ``}`}>
          {entryData?.map((entry, i) => (
            <FilterCard entry={entry} key={i} />
          ))}
        </div>
        <FilterStats stats={calculateStats(entryData!)} />
      </div>
    </div>
  );
};
