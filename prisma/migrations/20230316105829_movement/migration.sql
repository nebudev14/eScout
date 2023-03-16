/*
  Warnings:

  - Made the column `matchFormAnswersId` on table `Gamepiece` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Gamepiece" DROP CONSTRAINT "Gamepiece_matchFormAnswersId_fkey";

-- AlterTable
ALTER TABLE "Gamepiece" ALTER COLUMN "matchFormAnswersId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Gamepiece" ADD CONSTRAINT "Gamepiece_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
