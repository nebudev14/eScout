/*
  Warnings:

  - You are about to drop the column `matchType` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType";

-- AlterTable
ALTER TABLE "MatchFormResponse" ADD COLUMN     "matchType" "MatchType" NOT NULL DEFAULT 'QUALIFICATION';
