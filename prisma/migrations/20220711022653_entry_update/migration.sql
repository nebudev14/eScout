/*
  Warnings:

  - Added the required column `event` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchNumber` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchType` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('QUALIFICATION', 'QUARTERFINAL', 'SEMIFINAL', 'FINAL');

-- CreateEnum
CREATE TYPE "RungLevel" AS ENUM ('LOW', 'MID', 'HIGH', 'TRAVERSAL');

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "matchNumber" INTEGER NOT NULL,
ADD COLUMN     "matchType" "MatchType" NOT NULL;
