import { Container } from "../../ui/container";
import { Input } from "../../ui/input";
import { Competition, MatchType } from "@prisma/client";
import { useQuery } from "../../../hooks/trpc";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Combobox } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { useAtom } from "jotai";
import { setPreScoutAtom, setSelectedCompAtom } from "../../../server/atoms";

export const MatchInfo: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const [selectedComp, setSelectedComp] = useAtom(setSelectedCompAtom);
  const [prescout] = useAtom(setPreScoutAtom);
  const { data: session } = useSession();
  const { data: userData } = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    if (userData?.teams.length !== 0) {
      setSelectedTeam(userData?.teams[0].teamNumber);
      setSelectedComp(userData?.teams[0].team.comps[0]);
    }
  }, [userData?.teams, setSelectedComp]);

  const { data: compData, isLoading } = useQuery([
    "comp.get-by-number",
    { team: Number(selectedTeam) },
  ]);

  const [compQuery, setCompQuery] = useState("");
  const filteredComps =
    compQuery === ""
      ? compData
      : compData?.filter((compData: Competition) => {
          return compData.name.toLowerCase().includes(compQuery.toLowerCase());
        });

  return (
    <div className="grid grid-cols-1 mb-8">
      <Container>
        <label className="p-3 py-2 text-lg leading-tight border rounded shadow dark:bg-zinc-900 dark:border-zinc-700 bg-slate-200 text-cetner focus:outline-none focus:shadow-outline">
          Submit data to
        </label>
        <select
          id="teamNumber"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          value={selectedTeam}
          onChange={(event: React.SyntheticEvent) => {
            setSelectedTeam(Number((event.target as HTMLSelectElement).value));
          }}
        >
          {userData?.teams.map((team, i) => (
            <option key={i} value={team.teamNumber}>
              {team.teamNumber}
            </option>
          ))}
        </select>
      </Container>
      <Container>
        <select
          id="matchType"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:text-white dark:bg-zinc-900"
        >
          <option value={MatchType.QUALIFICATION}>Qualification</option>
          <option value={MatchType.QUARTERFINAL}>Quarterfinal</option>
          <option value={MatchType.SEMIFINAL}>Semifinal</option>
          <option value={MatchType.FINAL}>Final</option>
        </select>
        <Input
          id="matchNumber"
          placeholder="Match number"
          type="number"
          autoComplete="off"
          required
        />
      </Container>
      <Input
        id="entryTeamNumber"
        placeholder="Team number"
        type="number"
        autoComplete="off"
        required
      />
      {prescout ? (
        <Input
          id="videoLink"
          placeholder="Video Link"
          type="text"
          autoComplete="off"
          required
        />
      ) : null}
      <Combobox value={selectedComp} onChange={setSelectedComp}>
        <div className="relative z-50 border rounded-b dark:border-zinc-700">
          <div className="relative w-full overflow-hidden text-left bg-white rounded shadow-md cursor-default dark:border-zinc-700 dark:text-white dark:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="p-2 text-lg leading-tight rounded focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:text-white dark:bg-zinc-900"
              displayValue={(comp: Competition) => comp?.name}
              onChange={(event) => setCompQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:border-zinc-700 dark:text-white dark:bg-zinc-900 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredComps?.map((comp: Competition) => (
              <Combobox.Option
                key={comp.name}
                value={comp}
                className="relative px-3 py-2 cursor-default select-none"
              >
                {comp.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};
