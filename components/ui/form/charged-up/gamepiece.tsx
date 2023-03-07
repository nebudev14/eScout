import ModalWrapper from "@components/ui/modal-wrapper";
import React, { useState } from "react";
import { BsCone } from "react-icons/bs";
import { GiCube } from "react-icons/gi";
import { MatchFormInput, Modal } from "types/misc-types";

const levels = [
  {
    level: "LOW",
    color: "bg-red-500"
  },
  {
    level: "MID",
    color: "bg-yellow-500"
  },
  {
    level: "HIGH",
    color: "bg-green-500"
  },
  {
    level: "DROPPED",
    color: "bg-cyan-500"
  },
]

export const GamepieceInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState
}) => {
  const [isScoringOpen, setIsScoringOpen] = useState<boolean>(false);
  
  const [isCone, setIsCone] = useState<boolean>(true);
  

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        {isCone ? (
          <BsCone
            onClick={() => setIsCone(!isCone)}
            size={75}
            className="text-yellow-500 hover:cursor-pointer"
          />
        ) : (
          <GiCube
            onClick={() => setIsCone(!isCone)}
            size={75}
            className="text-purple-500 hover:cursor-pointer"
          />
        )}
      </div>
      <div className="grid grid-cols-2 mt-10 text-xl font-semibold text-white">
        <div onClick={() => setIsScoringOpen(true)} className="py-6 text-center bg-pink-600 border-r-4 border-black rounded-l-xl ">Human Player</div>
        <div onClick={() => setIsScoringOpen(true)} className="py-6 text-center border-l-4 border-black rounded-r-xl bg-cyan-500">Field</div>
      </div>
      <ScoreLevelModal isOpen={isScoringOpen} setIsOpen={setIsScoringOpen} />
    </div>
  );
};

const ScoreLevelModal: React.FC<Modal> = ({
  isOpen, setIsOpen
}) => {
  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <div >
        {levels.map((l, i) => (
          <div className={`${l.color} text-center my-2 py-4 text-white rounded-2xl `} key={i}>
            <h1 className="text-xl font-bold">{l.level}</h1>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
}