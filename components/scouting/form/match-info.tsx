import { Container } from "../../ui/container";
import { Input } from "../../ui/input";
import { Competition, MatchType } from "@prisma/client";
import { useQuery } from "../../../hooks/trpc";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Combobox } from "@headlessui/react";

export const MatchInfo: React.FC = () => {
  
  const [selectedTeam, setSelectedTeam] = useState<number>();
  const [selectedComp, setSelectedComp] = useState();
  const { data: session } = useSession();
  const { data: userData, isLoading } = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  useEffect(() => {
    setSelectedTeam(userData?.teams[0].teamNumber)
  }, [userData?.teams]);

  const { data: compData } = useQuery([
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
        <select
          id="matchType"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
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
      <Container>
        <label className="p-3 py-2 text-lg leading-tight border rounded shadow bg-slate-200 text-cetner focus:outline-none focus:shadow-outline">
          Submit data to
        </label>
        <select
          id="teamNumber"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
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
      <Input
        id="entryTeamNumber"
        placeholder="Team number"
        type="number"
        autoComplete="off"
        required
      />
    <Combobox value={selectedComp} onChange={setSelectedComp}>
      <Combobox.Input onChange={(event) => setCompQuery(event.target.value)} />
      <Combobox.Options>
        {filteredComps?.map((comp: Competition) => (
          <Combobox.Option key={comp.name} value={comp.name}>
            {comp.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
    </div>
  );
};
