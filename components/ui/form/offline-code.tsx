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
          className="p-2 mt-2 text-lg font-semibold text-white duration-150 rounded shadow bg-cyan-500 focus:outline-none focus:shadow-outline"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const compressedData: Uint8Array = compress(
              JSON.stringify(answers)
            );
            console.log(compressedData);
            console.log(compressedData.length);
          }}
        >
          Submit Offline
        </button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
