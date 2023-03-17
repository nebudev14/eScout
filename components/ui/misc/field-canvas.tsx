import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Image from "next/image";
import Field from "../../../public/field23.png";
import { loadCanvasImage } from "@util/load-canvas-image";
import { FieldNodeAction, PieceType } from "@prisma/client";
import { ChargedFieldNodeType, GamepieceFormType } from "types/form-types";

export const FieldCanvas: React.FC<{
  currPiece: PieceType;
  currNode: FieldNodeAction;
  currentNodes: ChargedFieldNodeType[];
  updateNodes: Dispatch<SetStateAction<ChargedFieldNodeType[]>>;
  updateFormState: (nextState: ChargedFieldNodeType[]) => void;
}> = ({ currPiece, currNode, updateNodes, currentNodes, updateFormState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    canvas!.height = 1500;
    canvas!.width = 3000;
  }, [canvasRef]);

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

          let nextState: ChargedFieldNodeType[] = [
            ...currentNodes,
            {
              xCoord: xCoord,
              yCoord: yCoord,
              piece: currPiece,
              action: currNode,
            },
          ];

          updateNodes(nextState);
          updateFormState(nextState);

          console.log(currentNodes)

          loadCanvasImage(
            xCoord * 3000 - 50,
            yCoord * 1500 - 50,
            canvasRef.current as HTMLCanvasElement,
            currPiece,
            currNode
          );
        }}
        ref={canvasRef}
      ></canvas>
      <Image src={Field} className="relative" />
    </div>
  );
};
