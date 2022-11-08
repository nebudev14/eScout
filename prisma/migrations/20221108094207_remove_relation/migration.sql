/*
  Warnings:

  - You are about to drop the column `pitFormId` on the `PitResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PitResponse" DROP CONSTRAINT "PitResponse_pitFormId_fkey";

-- AlterTable
ALTER TABLE "PitResponse" DROP COLUMN "pitFormId";
