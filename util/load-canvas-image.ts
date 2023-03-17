import { FieldNodeAction, PieceType } from "@prisma/client";

export function loadCanvasImage(
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
  currPiece: PieceType,
  currAction: FieldNodeAction
) {
  if (currAction === "PICKED" || currAction === "SCORE") {
    const image = new Image();
    image.src = ("/" + (getAction(currAction) + "-" + getPiece(currPiece)) + ".svg");

    const context = canvas.getContext("2d");
    image.onload = () => {
      context!.drawImage(image, x, y, 100, 100);
    };
  } else {
    const context = canvas.getContext("2d");
    context!.beginPath();

    context!.arc(x + 50, y + 50, 30, 0, 2 * Math.PI);
    context!.fillStyle = "#db2777";

    context!.fill();
  }
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
  switch (currAction) {
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
