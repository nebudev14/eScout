import { Container } from "./container";
import { Input } from "./input";

export const MatchInfo: React.FC = () => {
  return (
    <>
      <Container>
        <select
          id="matchType"
          className="p-2 text-lg leading-tight border rounded shadow focus:outline-none focus:shadow-outline"
        >
          <option>Qualification</option>
          <option>Quarterfinal</option>
          <option>Semifinal</option>
          <option>Final</option>
        </select>
        <Input id="matchNumber" placeholder="Match number" readonly={false} />
      </Container>
      <Input id="teamNumber" readonly={false} placeholder="Team number" />
      <Input id="eventName" readonly={false} placeholder="Event name" />
    </>
  );
};
