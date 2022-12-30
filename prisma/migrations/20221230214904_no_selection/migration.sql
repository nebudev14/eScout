/*
  Warnings:

  - You are about to drop the column `slot3` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `MatchFormQuestion` table. All the data in the column will be lost.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `scoreMultiplier` to the `MatchFormQuestion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `questionType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `promptType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TeamUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormAnswers" DROP COLUMN "slot3";

-- AlterTable
ALTER TABLE "MatchFormQuestion" DROP COLUMN "options",
ADD COLUMN     "scoreMultiplier" INTEGER NOT NULL,
DROP COLUMN "questionType",
ADD COLUMN     "questionType" "MatchQuestionType" NOT NULL,
DROP COLUMN "promptType",
ADD COLUMN     "promptType" "MatchPromptType" NOT NULL;

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "TeamUser" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL;

-- CreateTable
CREATE TABLE "PromptSelection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scoreMultiplier" INTEGER NOT NULL,
    "matchFormAnswersId" TEXT,
    "matchFormQuestionId" TEXT,

    CONSTRAINT "PromptSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromptSelection" ADD CONSTRAINT "PromptSelection_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptSelection" ADD CONSTRAINT "PromptSelection_matchFormQuestionId_fkey" FOREIGN KEY ("matchFormQuestionId") REFERENCES "MatchFormQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
