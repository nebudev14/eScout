import ModalWrapper from "@components/ui/modal-wrapper";
import React, { useState } from "react";
import { BsCone } from "react-icons/bs";
import { GiCube } from "react-icons/gi";
import { MatchFormInput, Modal } from "types/misc-types";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const levels = [
  {
    level: "LOW",
    color: "bg-purple-600",
  },
  {
    level: "MID",
    color: "bg-yellow-500",
  },
  {
    level: "HIGH",
    color: "bg-green-500",
  },
  {
    level: "DROPPED",
    color: "bg-red-500",
  },
];

interface GamepieceInput {
  level: string;
  gamepiece: string;
  location: string;
}

export const GamepieceInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  // Scoring states
  const [inputScore, setInputScore] = useState<GamepieceInput | undefined>({
    level: "DROPPED",
    gamepiece: "CUBE",
    location: "HPS",
  });
  const [globalScore, setGlobalScore] = useState<GamepieceInput[]>([]);

  // UI States
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
        <div
          onClick={() => setIsScoringOpen(!isScoringOpen)}
          className="py-6 text-center bg-pink-600 border-r-4 border-black rounded-l-xl "
        >
          Human Player
        </div>
        <div
          onClick={() => setIsScoringOpen(!isScoringOpen)}
          className="py-6 text-center border-l-4 border-black rounded-r-xl bg-cyan-500"
        >
          Field
        </div>
      </div>
      <motion.nav
        animate={isScoringOpen ? "open" : "closed"}
        variants={variants}
      >
        <div className={`px-8 py-6 mt-4 duration-200`}>
          {levels.map((l, i) => (
            <div
              className={`${l.color} text-center my-2 py-4 text-white rounded-2xl `}
              key={i}
            >
              <h1 className="text-xl font-bold">{l.level}</h1>
            </div>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};
