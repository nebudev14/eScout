/*
  Warnings:

  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `TeamUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MatchQuestionType" AS ENUM ('SCORE', 'COUNTER', 'INPUT', 'MULTIPLE');

-- CreateEnum
CREATE TYPE "MatchPromptType" AS ENUM ('TEXT', 'NUMBER');

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "TeamUser" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL;

-- CreateTable
CREATE TABLE "MatchForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "MatchForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchFormCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "matchFormId" TEXT NOT NULL,

    CONSTRAINT "MatchFormCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchFormQuestion" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "questionType" "MatchQuestionType" NOT NULL,
    "promptType" "MatchPromptType" NOT NULL,
    "matchCategoryId" TEXT NOT NULL,

    CONSTRAINT "MatchFormQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchFormResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "compId" TEXT NOT NULL,
    "prescout" BOOLEAN NOT NULL,
    "video" TEXT,

    CONSTRAINT "MatchFormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchFormAnswers" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "slot1" TEXT,
    "slot2" TEXT,
    "slot3" TEXT[],

    CONSTRAINT "MatchFormAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchForm" ADD CONSTRAINT "MatchForm_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormCategory" ADD CONSTRAINT "MatchFormCategory_matchFormId_fkey" FOREIGN KEY ("matchFormId") REFERENCES "MatchForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormQuestion" ADD CONSTRAINT "MatchFormQuestion_matchCategoryId_fkey" FOREIGN KEY ("matchCategoryId") REFERENCES "MatchFormCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormResponse" ADD CONSTRAINT "MatchFormResponse_userId_teamId_fkey" FOREIGN KEY ("userId", "teamId") REFERENCES "TeamUser"("userId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormResponse" ADD CONSTRAINT "MatchFormResponse_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchFormAnswers" ADD CONSTRAINT "MatchFormAnswers_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "MatchFormResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
