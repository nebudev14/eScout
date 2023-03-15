import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Field from "../../../public/field23.png";

export const FieldCanvas: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.beginPath();
      context.arc(0, 0, 10, 0, 2 * Math.PI);
      context.fillStyle = "rgba(255, 0, 0, 1)";
      // context.moveTo(20, 200)
      context.fill();
    }
  });

  return (
    <div className="relative">
      <canvas
        className="absolute z-50 w-full h-full "
        onClick={(e: React.MouseEvent) => {
          const { offsetX, offsetY } = e.nativeEvent;
          const xCoord = (e.target as HTMLElement).offsetWidth / offsetX;
          const yCoord = (e.target as HTMLElement).offsetHeight / offsetY;
          console.log(xCoord);
          console.log(yCoord);
          // if (isFinite(xCoord) && isFinite(yCoord)) {
          //   setNodes([...nodes, { xCoord, yCoord }]);
          // }
        }}
        ref={canvasRef}
      ></canvas>
      <Image src={Field} className="relative" />
      
    </div>
  );
};
