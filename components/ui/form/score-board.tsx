import React, { useEffect, useState } from "react";
import { Answer } from "types/form-types";
import { MatchFormInput } from "types/misc-types";
import { Container } from "../container";

export const ScoreBoard: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  const [shot, setShot] = useState(0);
  const [total, setTotal] = useState(0);

  const updateFormState = (shots: number, miss: number) => {
    if (updateState){
      updateState({
        questionId: id,
        slot1: shots.toString(),
        slot2: miss.toString(),
      });
    }
  };

  return (
    <div className="my-2">
      <Container>
        <label className="p-2 text-lg font-semibold leading-tight border rounded shadow bg-slate-200 dark:bg-zinc-900 dark:border-none focus:outline-none focus:shadow-outline">
          {label}
        </label>
        <div className="flex items-center text-lg font-medium leading-tight border rounded shadow dark:bg-zinc-700 dark:border-zinc-800 focus:outline-none focus:shadow-outline justify-evenly">
          <h1 id={`${id}Shots`}>{shot}</h1>
          <h1 className="flex items-center justify-center h-full px-4 text-center border-l-2 border-r-2 border-slate-300 dark:border-zinc-600">
            /
          </h1>
          <h1 id={`${id}Total`}>{total}</h1>
        </div>
      </Container>
      <Container>
        <Container>
          <button
            className="p-2 text-lg font-semibold text-white bg-green-500 rounded-tl rounded-bl shadow dark:bg-green-500 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setShot(prev => prev + 1);
              setTotal(prev => prev + 1);
              updateFormState(shot+1, total+1);

            }}
          >
            Score
          </button>
          <button
            className="p-2 text-lg font-semibold text-white bg-red-500 shadow dark:bg-rose-500 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setTotal(prev => prev + 1);
              updateFormState(shot, total+1);
            }}
          >
            Miss
          </button>
        </Container>
        <Container>
          <button
            className="p-2 text-lg font-semibold text-white bg-yellow-500 border-r-2 shadow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              if (shot !== 0) {
                setShot(prevState => prevState - 1);
                updateFormState(shot-1, total);
              }
            }}
          >
            -1
          </button>
          <button
            className="p-2 text-lg font-semibold text-white bg-yellow-500 rounded-tr rounded-br shadow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              if (total !== 0) {
                setTotal(prevState => prevState - 1);
                updateFormState(shot, total-1);
              }
            }}
          >
            -1
          </button>
        </Container>
      </Container>
    </div>
  );
};
