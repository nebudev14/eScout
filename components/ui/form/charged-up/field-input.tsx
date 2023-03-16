import React, { useState } from "react";
import { MatchFormInput } from "types/misc-types";
import Image from "next/image";
import Field from "../../../../public/field23.png";
import { ChargedFieldNodeType } from "types/form-types";
import { FieldCanvas } from "@components/ui/misc/field-canvas";

export const FieldInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  const [nodes, setNodes] = useState<ChargedFieldNodeType[]>([]);

  return (
    <div className="">
      <FieldCanvas width={100} height={100} />
      
    </div>
  );
};
