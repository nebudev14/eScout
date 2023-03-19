/*
  Warnings:

  - You are about to drop the column `comments` on the `MatchFormAnswers` table. All the data in the column will be lost.
  - Added the required column `comments` to the `MatchFormResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchFormAnswers" DROP COLUMN "comments";

-- AlterTable
ALTER TABLE "MatchFormResponse" ADD COLUMN     "comments" TEXT NOT NULL;
