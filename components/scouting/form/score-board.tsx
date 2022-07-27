import React, { useState } from "react";
import { Container } from "../../ui/container";

export const ScoreBoard: React.FC<{ label: string; id: string }> = ({
  label,
  id,
}) => {
  const [shot, setShot] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div className="mt-2">
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <div className="flex items-center text-lg font-medium leading-tight border rounded shadow focus:outline-none focus:shadow-outline justify-evenly">
          <h1 id={`${id}Shots`}>{shot}</h1>
          <h1 className="flex items-center justify-center h-full px-4 text-center border-l-2 border-r-2 border-slate-300">
            /
          </h1>
          <h1 id={`${id}Total`}>{total}</h1>
        </div>
      </Container>
      <Container>
        <Container>
          <button
            className="p-2 text-lg font-semibold text-white bg-green-500 rounded-tl rounded-bl shadow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setShot(shot + 1);
              setTotal(total + 1);
            }}
          >
            Score
          </button>
          <button
            className="w-full p-2 text-lg font-semibold text-white bg-red-500 shadow border- focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setTotal(total + 1)}
          >
            Miss
          </button>
        </Container>
        <Container>
          <button
            className="p-2 text-lg font-semibold text-white bg-yellow-500 border-r-2 shadow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              if (shot !== 0) setShot(shot - 1);
            }}
          >
            -1
          </button>
          <button
            className="p-2 text-lg font-semibold text-white bg-yellow-500 rounded-tr rounded-br shadow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              if (total !== 0) setTotal(total - 1);
            }}
          >
            -1
          </button>
        </Container>
      </Container>
    </div>
  );
};
