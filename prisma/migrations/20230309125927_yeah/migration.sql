/*
  Warnings:

  - Made the column `matchFormAnswersId` on table `MatchSlot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MatchSlot" DROP CONSTRAINT "MatchSlot_matchFormAnswersId_fkey";

-- AlterTable
ALTER TABLE "MatchSlot" ALTER COLUMN "matchFormAnswersId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MatchSlot" ADD CONSTRAINT "MatchSlot_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
