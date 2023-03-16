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
      // context.beginPath();
      // context.arc(300, 150, 5, 0, 2 * Math.PI);
      // context.fillStyle = "rgba(255, 0, 0, 1)";
      // // context.moveTo(20, 200)
      // context.fill();
    }
  });

  // 300 x
  // 150 y

  return (
    <div className="relative select-none">
      <canvas
        className="absolute z-50 w-full h-full "
        onClick={(e: React.MouseEvent) => {
          const { offsetX, offsetY } = e.nativeEvent;
          const xCoord = offsetX / (e.target as HTMLElement).offsetWidth;
          const yCoord = offsetY / (e.target as HTMLElement).offsetHeight;
          const context = canvasRef?.current?.getContext("2d");
          context!.beginPath();

          context!.arc(xCoord*300, yCoord*150, 3, 0, 2 * Math.PI);
          context!.fillStyle = "rgba(255, 0, 0, 1)";
          // context.moveTo(20, 200)
          context!.fill();
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
