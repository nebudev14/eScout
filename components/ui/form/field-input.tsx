import React from "react";
import Image from "next/image";
import Field from "../../../public/field23.png";

export const FieldInput: React.FC = () => {
  return (
    <div className="py-8">
      <div className="">
        <Image src={Field} width={2400} height={1200} className="" onClick={(e: React.MouseEvent) => {
          const { offsetX, offsetY } = e.nativeEvent;
          console.log(offsetX)
          console.log(offsetY)
        }}/>
      </div>
    </div>
  );
};
