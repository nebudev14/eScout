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
    <>
      <h1 className="px-1 pb-4 text-lg font-semibold dark:text-zinc-300 ">
        {label}
      </h1>
      <div className="py-8 border-t-2 border-zinc-600">
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
          <div className="inline-flex mt-4 border-2 rounded-xl border-zinc-700 ">
            <div className="flex items-center justify-center"> 
              {" "}
              <h1
                onClick={() => setSelectedAction("SCORE")}
                className={`font-semibold hover:cursor-pointer py-3 px-4 rounded-l-xl duration-150 ${
                  action === "SCORE" ? "bg-green-400 text-white" : "text-green-500"
                }`}
              >
                Score
              </h1>
            </div>
            <div className="flex items-center justify-center"> 
              {" "}
              <h1
                onClick={() => setSelectedAction("MOVEMENT")}
                className={`px-4 py-3 font-semibold hover:cursor-pointer duration-150  ${
                  action === "MOVEMENT" ? "bg-pink-600 text-white" : "text-pink-600"
                }`}
              >
                Move
              </h1>
            </div>
            <div className="flex items-center justify-center"> 
              {" "}
              <h1
                onClick={() => setSelectedAction("PICKED")}
                className={`py-3 px-4 font-semibold hover:cursor-pointer duration-150 rounded-r-xl ${
                  action === "PICKED" ? "bg-cyan-500 text-white" : "text-cyan-500"
                }`}
              >
                Pick Up
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
