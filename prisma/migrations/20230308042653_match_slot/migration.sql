/*
  Warnings:

  - You are about to drop the column `slot1` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `slot2` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `slot3` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `slot4` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - Added the required column `matchSlotId` to the `MatchFormAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchFormAnswers" DROP COLUMN "slot1",
DROP COLUMN "slot2",
DROP COLUMN "slot3",
DROP COLUMN "slot4",
ADD COLUMN     "matchSlotId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MatchSlot" (
    "id" TEXT NOT NULL,
    "slot1" TEXT,
    "slot2" TEXT,
    "slot3" TEXT,
    "slot4" TEXT[],
    "matchFormAnswersId" TEXT,

    CONSTRAINT "MatchSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchFormAnswers" ADD CONSTRAINT "MatchFormAnswers_matchSlotId_fkey" FOREIGN KEY ("matchSlotId") REFERENCES "MatchSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSlot" ADD CONSTRAINT "MatchSlot_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
