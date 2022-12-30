/*
  Warnings:

  - You are about to drop the column `prompts` on the `MatchFormQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `scoreMultiplier` on the `MatchFormQuestion` table. All the data in the column will be lost.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `prompt` on table `MatchFormQuestion` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `questionType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `promptType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TeamUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "MatchFormCategory" DROP CONSTRAINT "MatchFormCategory_matchFormId_fkey";

-- DropForeignKey
ALTER TABLE "MatchFormQuestion" DROP CONSTRAINT "MatchFormQuestion_matchCategoryId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormQuestion" DROP COLUMN "prompts",
DROP COLUMN "scoreMultiplier",
ADD COLUMN     "options" TEXT[],
ALTER COLUMN "prompt" SET NOT NULL,
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

-- AddForeignKey
ALTER TABLE "MatchFormCategory" ADD CONSTRAINT "MatchFormCategory_matchFormId_fkey" FOREIGN KEY ("matchFormId") REFERENCES "MatchForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormQuestion" ADD CONSTRAINT "MatchFormQuestion_matchCategoryId_fkey" FOREIGN KEY ("matchCategoryId") REFERENCES "MatchFormCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
