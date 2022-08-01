import { Container } from "../../ui/container";
import { Input } from "../../ui/input";
import { MatchType } from "@prisma/client";
import { useQuery } from "../../../hooks/trpc";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const MatchInfo: React.FC = () => {
  const { data: session } = useSession();

  const userData = useQuery([
    "user.get-by-id",
    { userId: session?.user.id as string },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(
    userData?.data?.teams[0].teamNumber
  );

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
          {userData?.data?.teams.map((team, i) => (
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
      <Input
        id="eventName"
        placeholder="Event name"
        autoComplete="off"
        required
      />

    </div>
  );
};
