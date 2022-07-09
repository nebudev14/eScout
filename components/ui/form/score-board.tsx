import React from "react";
import { Container } from "../container";

export const ScoreBoard: React.FC<{ label: string }> = ({ label }) => {
  return (
    <>
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <div className="flex items-center text-lg font-medium leading-tight border rounded shadow focus:outline-none focus:shadow-outline justify-evenly">
          <h1>0</h1>
          <h1 className="flex items-center justify-center h-full px-4 text-center border-l-2 border-r-2 border-slate-300">
            /
          </h1>
          <h1>0</h1>
        </div>
      </Container>
      <Container>
        <Container>
          <button className="p-2 text-lg font-semibold text-white bg-green-500 rounded-tl rounded-bl shadow focus:outline-none focus:shadow-outline hover:bg-teal-700">
            Score
          </button>
          <button className="w-full p-2 text-lg font-semibold text-white bg-red-500 shadow border- focus:outline-none focus:shadow-outline hover:bg-teal-700">
            Miss
          </button>
        </Container>
        <Container>
          <button
            type="button"
            className="p-2 text-lg font-semibold text-white bg-yellow-500 border-r-2 shadow focus:outline-none focus:shadow-outline hover:bg-teal-700"
          >
            -1
          </button>
          <button
            type="button"
            className="p-2 text-lg font-semibold text-white bg-yellow-500 rounded-tr rounded-br shadow focus:outline-none focus:shadow-outline hover:bg-teal-700"
          >
            -1
          </button>
        </Container>
      </Container>
    </>
  );
};
