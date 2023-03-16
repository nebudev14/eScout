import React, { useState } from "react";
import { MatchFormInput } from "types/misc-types";
import Image from "next/image";
import Field from "../../../../public/field23.png";
import { ChargedFieldNodeType } from "types/form-types";
import { FieldCanvas } from "@components/ui/misc/field-canvas";
import { BsCone, BsCheckSquare } from "react-icons/bs";
import { GiCube, GiCardPickup } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FieldNodeAction, PieceType } from "@prisma/client";

// const icons = [
//   {
//     action: FieldNodeAction.DROPPED,
//     icon: <ImCross size={40} />
//   }
// ]

export const FieldInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  const [nodes, setNodes] = useState<ChargedFieldNodeType[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PieceType>("CONE");
  const [action, setSelectedAction] = useState<FieldNodeAction>("SCORE");

  return (
    <div className="py-8 border-y-2 border-zinc-600">
      <div className="inline-flex py-3 mb-4 border-2 rounded-xl border-zinc-700">
        <BsCone
          size={45}
          onClick={() => setSelectedPiece("CONE")}
          className={`mx-3 py-1 text-yellow-500 hover:cursor-pointer ${
            selectedPiece === "CONE" ? "border-b-4 border-green-400" : ""
          }`}
        />
        <GiCube
          size={45}
          onClick={() => setSelectedPiece("CUBE")}
          className={`mx-3 py-1 text-purple-500 hover:cursor-pointer ${
            selectedPiece !== "CONE" ? "border-b-4 border-green-400" : ""
          }`}
        />
      </div>
      <FieldCanvas currPiece={selectedPiece} currNode={action} />
      <div className="flex items-center justify-center">
        <div className="inline-flex py-3 mt-4 border-2 rounded-xl border-zinc-700 ">
          <BsCheckSquare
            size={45}
            onClick={() => setSelectedAction("SCORE")}
            className={`mx-3 hover:cursor-pointer py-1 text-green-500 ${
              action === "SCORE" ? "border-b-4 border-green-400" : ""
            }`}
          />
          <FaRunning
            size={45}
            onClick={() => setSelectedAction("MOVEMENT")}
            className={`mx-3 hover:cursor-pointer py-1 text-pink-600 ${
              action === "MOVEMENT" ? "border-b-4 border-green-400" : ""
            }`}
          />
          <GiCardPickup
            size={45}
            onClick={() => setSelectedAction("PICKED")}
            className={`mx-3 py-1 hover:cursor-pointer text-cyan-500 ${
              action === "PICKED" ? "border-b-4 border-green-400" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};
