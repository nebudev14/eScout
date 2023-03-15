import React from "react";
import { MatchFormInput } from "types/misc-types";
import Image from "next/image";
import Field from "../../../../public/field23.png"

export const FieldInput: React.FC<MatchFormInput> = ({
  label,
  id,
  updateState,
}) => {
  
  return (
    <div>
      <div className="mb-24" ></div>
      <Image
        src={Field}
        onClick={(e: React.MouseEvent) => {
          const offsetHeight = (e.target as HTMLElement).offsetHeight;
          const offsetWidth = (e.target as HTMLElement).offsetWidth;
          console.log()
          const { offsetX, offsetY } = e.nativeEvent;
          console.log((offsetWidth/offsetX));
          console.log((offsetHeight/offsetY));
        }}
      />
    </div>
  );
};
