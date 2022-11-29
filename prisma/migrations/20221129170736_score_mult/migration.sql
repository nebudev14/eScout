/*
  Warnings:

  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `questionId` to the `MatchFormAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreMultiplier` to the `MatchFormQuestion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `questionType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `promptType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `matchScore` to the `MatchFormResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `MatchFormResponse` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TeamUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormAnswers" ADD COLUMN     "questionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormQuestion" ADD COLUMN     "scoreMultiplier" INTEGER NOT NULL,
DROP COLUMN "questionType",
ADD COLUMN     "questionType" "MatchQuestionType" NOT NULL,
DROP COLUMN "promptType",
ADD COLUMN     "promptType" "MatchPromptType" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormResponse" ADD COLUMN     "matchScore" INTEGER NOT NULL,
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "TeamUser" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "MatchFormResponse" ADD CONSTRAINT "MatchFormResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MatchFormQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormAnswers" ADD CONSTRAINT "MatchFormAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MatchFormQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
