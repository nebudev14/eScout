-- CreateEnum
CREATE TYPE "Location" AS ENUM ('HPS', 'FIELD');

-- CreateEnum
CREATE TYPE "PieceType" AS ENUM ('CONE', 'CUBE');

-- CreateEnum
CREATE TYPE "GamepieceHeight" AS ENUM ('LOW', 'MID', 'HIGH', 'DROPPED');

-- CreateTable
CREATE TABLE "Gamepiece" (
    "id" TEXT NOT NULL,
    "height" "GamepieceHeight" NOT NULL,
    "type" "PieceType" NOT NULL,
    "location" "Location" NOT NULL,

    CONSTRAINT "Gamepiece_pkey" PRIMARY KEY ("id")
);
