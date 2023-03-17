import { FieldNodeAction, PieceType } from "@prisma/client";

export function loadCanvasImage(
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
  currPiece: PieceType,
  currAction: FieldNodeAction
) {
  const image = new Image();
  image.src = ("/" + (getAction(currAction) + "-" + getPiece(currPiece)) + ".svg");

  const context = canvas.getContext("2d");
  image.onload = () => {
    context!.drawImage(image, x, y, 100, 100);
  };
}

function getPiece(currPiece: PieceType) {
  switch (currPiece) {
    case "CONE":
      return "cone"
    case "CUBE":
      return "cube"
  }
}

function getAction(currAction: FieldNodeAction) {
  switch(currAction) {
    case "DROPPED":
      return "drop"
    case "MOVEMENT":
      return "move";
    case "PICKED":
      return "pick";
    case "SCORE":
      return "score"
  }
}
