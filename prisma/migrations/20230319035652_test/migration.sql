/*
  Warnings:

  - Added the required column `comments` to the `MatchFormAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchFormAnswers" ADD COLUMN     "comments" TEXT NOT NULL;
