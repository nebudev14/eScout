import React, { useState } from "react";
import { MatchFormInput } from "types/misc-types";
import Image from "next/image";
import Field from "../../../../public/field23.png";
import { ChargedFieldNodeType } from "types/form-types";
import { FieldCanvas } from "@components/ui/misc/field-canvas";
import { BsCone, BsCheckSquare } from "react-icons/bs";
import { GiCube, GiCardPickup } from "react-icons/gi";

export const FieldInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  const [nodes, setNodes] = useState<ChargedFieldNodeType[]>([]);

  return (
    <div className="">
      <FieldCanvas width={100} height={100} />
      <div className="flex items-center justify-center">
        <div className="inline-flex py-2 mt-4 mr-8 border-2 rounded-xl border-zinc-700 ">
          <BsCone size={45} className="mx-3 text-yellow-500 border-zinc-700" />
          <GiCube size={45} className="mx-3 text-purple-500 " />
        </div>
        <div className="inline-flex py-2 mt-4 border-2 rounded-xl border-zinc-700 ">
          <BsCheckSquare
            size={45}
            className="mx-3 text-pink-600 border-zinc-700"
          />
          <GiCardPickup size={45} className="mx-3 text-cyan-500 " />
        </div>
      </div>
    </div>
  );
};
