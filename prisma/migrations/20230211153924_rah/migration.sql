/*
  Warnings:

  - You are about to drop the column `matchScore` on the `MatchFormResponse` table. All the data in the column will be lost.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
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
ALTER TABLE "MatchFormQuestion" DROP COLUMN "questionType",
ADD COLUMN     "questionType" "MatchQuestionType" NOT NULL,
DROP COLUMN "promptType",
ADD COLUMN     "promptType" "MatchPromptType" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormResponse" DROP COLUMN "matchScore";

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "TeamUser" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL;
