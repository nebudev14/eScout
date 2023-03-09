-- DropForeignKey
ALTER TABLE "MatchFormAnswers" DROP CONSTRAINT "MatchFormAnswers_matchSlotId_fkey";

-- AlterTable
ALTER TABLE "MatchFormAnswers" ADD COLUMN     "slot1" TEXT,
ADD COLUMN     "slot2" TEXT,
ADD COLUMN     "slot3" TEXT,
ADD COLUMN     "slot4" TEXT[];
