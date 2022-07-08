import type { NextPage } from "next";
import React from "react";
import { Protected } from "../components/auth/protected";
import { Container } from "../components/ui/container";
import { Input } from "../components/ui/input";


const submitData = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  const target = event.target as typeof event.target & {
    matchNumber: { value: string };
  }

  console.log(target.matchNumber.value);
}

const Scout: NextPage = () => {
  return (
    <Protected>
      <div className="h-screen p-4">
        <form onSubmit={submitData} className="grid grid-cols-1">
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
          <button type="submit" className="p-2 mt-2 text-lg text-white bg-teal-500 rounded shadow focus:outline-none focus:shadow-outline hover:bg-teal-700">
            Submit
          </button>
        </form>
      </div>
    </Protected>
  );
};

export default Scout;