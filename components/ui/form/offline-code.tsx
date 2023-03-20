import { QRCode, QR8BitByte } from "qrcode-generator-ts";
import React, { useRef } from "react";
import { compress } from "lzutf8";
import { Answer } from "types/form-types";

export const OfflineCode: React.FC<{ answers: Answer[] }> = ({ answers }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div>
      <div className="grid grid-cols-1">
        <button
          className="p-2 mt-2 mb-4 text-lg font-semibold text-white duration-150 rounded shadow bg-cyan-500 focus:outline-none focus:shadow-outline"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const compressedData: Uint8Array = compress(
              JSON.stringify(answers)
            );

            const code = new QRCode();
            console.log(compressedData.toString().length)
            code.setTypeNumber(40);
            code.addData(new QR8BitByte(compressedData.toString()));
            code.make();
            canvasRef!.current!.width = 543;
            canvasRef!.current!.height = 543;
            const context = canvasRef?.current?.getContext("2d");
            context!.fillStyle = "#ffffff";
            context!.fillRect(0, 0, 6000, 6000);

            context!.fillStyle = "#000000";
            for (var row = 0; row < code.getModuleCount(); row += 1) {
              for (var col = 0; col < code.getModuleCount(); col += 1) {
                if (code.isDark(row, col)) {
                  console.log("dark")
                  context!.fillRect(col*3.05, row*3.05, 3.05, 3.05);
                }
              }
            }
          }}
        >
          Submit Offline
        </button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
