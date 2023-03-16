import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Field from "../../../public/field23.png";
import { loadCanvasImage } from "@util/load-canvas-image";
import { FieldNodeAction, PieceType } from "@prisma/client";

export const FieldCanvas: React.FC<{
  currPiece: PieceType;
  currNode: FieldNodeAction;
}> = ({ currPiece, currNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    canvas!.height = 1500;
    canvas!.width = 3000;
  }, [canvasRef]);

  // 300 x
  // 150 y

  return (
    <div className="relative select-none">
      <canvas
        className="absolute z-50 w-full h-full "
        onClick={(e: React.MouseEvent) => {
          // canvasRef!.current!.height = 1500
          // canvasRef!.current!.width = 3000
          const { offsetX, offsetY } = e.nativeEvent;
          const xCoord = offsetX / (e.target as HTMLElement).offsetWidth;
          const yCoord = offsetY / (e.target as HTMLElement).offsetHeight;
          const context = canvasRef?.current?.getContext("2d");
 
          loadCanvasImage(
            (xCoord * 3000) - 50,
            (yCoord * 1500) - 50,
            canvasRef.current as HTMLCanvasElement,
            currPiece === "CONE" ? "/cone.svg" : "/cube.svg"
          );
          // let path = new Path2D("M 100,100 h 50 v 50 h 50");

          // context!.arc(xCoord * 300, yCoord * 150, 3, 0, 2 * Math.PI);
          // context!.moveTo(xCoord*300, yCoord*150)
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
