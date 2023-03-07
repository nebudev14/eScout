import ModalWrapper from "@components/ui/modal-wrapper";
import React, { useState } from "react";
import { BsCone } from "react-icons/bs";
import { GiCube } from "react-icons/gi";
import { MatchFormInput, Modal } from "types/misc-types";

export const GamepieceInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState
}) => {
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
      <div className="grid grid-cols-2 mt-10 text-xl text-white">
        <div className="py-6 text-center bg-pink-600 border-r-4 border-black rounded-l-xl ">Human Player</div>
        <div className="py-6 text-center border-l-4 border-black rounded-r-xl bg-cyan-400">Field</div>
      </div>
    </div>
  );
};

const ScoreLevelModa: React.FC<Modal> = ({
  isOpen, setIsOpen
}) => {
  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      
    </ModalWrapper>
  );
}