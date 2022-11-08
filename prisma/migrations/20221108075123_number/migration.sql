/*
  Warnings:

  - Added the required column `entryTeamNumber` to the `PitResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PitResponse" ADD COLUMN     "entryTeamNumber" INTEGER NOT NULL;
