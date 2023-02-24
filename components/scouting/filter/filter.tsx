import { trpc, useQuery } from "../../../hooks/trpc";
import React, { useRef, useState } from "react";
import type { Query } from "../../../types/filter-types";
import { DynamicInput, inputs } from "./dynamic-input";
import { useAtom } from "jotai";
import { selectEntryAtom, setSearchQueryAtom } from "../../../server/atoms";
import { FilterCard } from "../../ui/filter-card";
import { FilterStats } from "../stats/filter-stats";
import { calculateStats } from "../../../util/calculate-stats";
import { Switch } from "@headlessui/react";
import { Entry } from "@prisma/client";
import { SingleStats } from "../stats/single-stats";

/** DEPRECATED */
export const Filter: React.FC<{ teamId: string, isAdmin: boolean }> = ({ teamId, isAdmin }) => {
  const [queryAttribute, setQueryAttribute] =
    useState<string>("entryTeamNumber");
  const [query, setQuery] = useState<Query>({ prescout: false });

  let { data: entryData } = useQuery([
    "entry.get-by-filter",
    { teamId: teamId, query },
  ]);

  const { invalidateQueries } = trpc.useContext();

  const [currentInput] = useAtom(setSearchQueryAtom);
  const [currentEntry, setCurrentSelectedEntry] = useAtom(selectEntryAtom);
  const [prescout, setPrescout] = useState<boolean>(false);

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
      <div className="flex items-center mt-6 mb-3">
        <h1 className="mr-4 text-xl">Prescout</h1>
        <Switch
          checked={prescout}
          onChange={() => {
            setPrescout(!prescout);

            const newQuery = query;
            newQuery.prescout = !prescout;
            setQuery(newQuery);
            invalidateQueries("entry.get-by-filter");
          }}
          className={`${
            prescout ? "bg-pink-600" : "bg-zinc-600"
          } relative  inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              prescout ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full duration-300 ease-in-out bg-white transition`}
          />
        </Switch>
      </div>
      <div className="grid grid-cols-2 gap-10 md:flex md:flex-col">
        <form className="flex w-full mt-4" onSubmit={searchEntry}>
          <div className="grid grid-cols-2">
            <select
              id="queryType"
              className="w-full h-full p-2 border-r-4 rounded-l-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
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
        <div className="flex flex-wrap mb-4 md:mb-0">
          {Object.keys(query)
            .filter(
              (e) =>
                query[e as keyof typeof query] !== undefined && e !== "prescout"
            )
            .map((key, i) => (
              <div
                key={i}
                className="flex p-2 mb-2 text-sm text-white bg-pink-600 rounded-lg"
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
        <div className={`grid grid-cols-1 overflow-y-scroll h-[35rem]`}>
          {entryData?.map((entry, i) => (
            <div
              key={i}
              onClick={() =>
                currentEntry === entry
                  ? setCurrentSelectedEntry(undefined)
                  : setCurrentSelectedEntry(entry)
              }
            >
              <FilterCard entry={entry} user={entry?.user} isAdmin={isAdmin} />
            </div>
          ))}
        </div>
        {currentEntry === undefined ? <FilterStats data={entryData!} stats={calculateStats(entryData!)} /> : <SingleStats data={[currentEntry]} stats={calculateStats([currentEntry])} />}

      </div>
    </div>
  );
};
