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
    <div>
      <div className="relative">
        <div className="absolute -inset-1">
          <FieldCanvas width={100} height={100} />
          {/* <Image
            src={Field}
            className="relative"
            onClick={(e: React.MouseEvent) => {
              const { offsetX, offsetY } = e.nativeEvent;
              const xCoord = (e.target as HTMLElement).offsetWidth / offsetX;
              const yCoord = (e.target as HTMLElement).offsetHeight / offsetY;
              if (isFinite(xCoord) && isFinite(yCoord)) {
                setNodes([...nodes, { xCoord, yCoord }]);
              }
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};
