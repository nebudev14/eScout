import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Field from "../../../public/field23.png";
import { loadCanvasImage } from "@util/load-canvas-image";
import { PieceType } from "@prisma/client";

export const FieldCanvas: React.FC<{ currPiece: PieceType, currNode: height: number; width: number }> = ({
  height,
  width,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    if (context) {
      // loadCanvasImage(canvas as HTMLCanvasElement, "/cone.svg")
      // loadCanvasImage(canvas as HTMLCanvasElement, "/cube.svg")
      // context!.arc(xCoord*300, yCoord*150, 3, 0, 2 * Math.PI);
      // context!.moveTo(xCoord*300, yCoord*150)
      // context!.strokeStyle = '#359900';
      // // context!.fill();
      // context!.stroke();
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

          // let path = new Path2D("M 100,100 h 50 v 50 h 50");

          context!.arc(xCoord*300, yCoord*150, 3, 0, 2 * Math.PI);
          // context!.moveTo(xCoord*300, yCoord*150)
          context!.fillStyle = "rgba(255, 0, 0, 1)";
          context!.fill();
          // context!.stroke();
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
