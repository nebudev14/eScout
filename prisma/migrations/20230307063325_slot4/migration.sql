-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MatchQuestionType" ADD VALUE 'DEFENSE';
ALTER TYPE "MatchQuestionType" ADD VALUE 'GAMEPIECE_HEIGHT';
ALTER TYPE "MatchQuestionType" ADD VALUE 'CHARGE';

-- AlterTable
ALTER TABLE "MatchFormAnswers" ADD COLUMN     "slot4" TEXT[],
ALTER COLUMN "slot3" DROP NOT NULL,
ALTER COLUMN "slot3" SET DATA TYPE TEXT;
