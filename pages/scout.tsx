import type { NextPage } from "next";
import React, { FormEventHandler } from "react";
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
      <div className="flex items-start justify-center h-screen p-4">
        <form onSubmit={submitData}>
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
          <div className="grid grid-cols-1">
            <Input id="teamNumber" readonly={false} placeholder="Team number" />
          </div>
          <div className="grid grid-cols-1">
            <Input id="eventName" readonly={false} placeholder="Event name" />
          </div>
          <button type="submit">
            submit!!
          </button>
        </form>
      </div>
    </Protected>
  );
};

export default Scout;
