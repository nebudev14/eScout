/*
  Warnings:

  - The values [MULTIPLE] on the enum `MatchQuestionType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `questionType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `promptType` on the `MatchFormQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TeamUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MatchQuestionType_new" AS ENUM ('SCORE', 'COUNTER', 'INPUT', 'SELECT', 'BOOL');
ALTER TABLE "MatchFormQuestion" ALTER COLUMN "questionType" TYPE "MatchQuestionType_new" USING ("questionType"::text::"MatchQuestionType_new");
ALTER TYPE "MatchQuestionType" RENAME TO "MatchQuestionType_old";
ALTER TYPE "MatchQuestionType_new" RENAME TO "MatchQuestionType";
DROP TYPE "MatchQuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "MatchFormQuestion" ADD COLUMN     "prompts" TEXT[],
ALTER COLUMN "prompt" DROP NOT NULL,
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
