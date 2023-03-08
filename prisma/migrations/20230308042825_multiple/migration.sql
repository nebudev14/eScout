/*
  Warnings:

  - Added the required column `multiple` to the `MatchFormQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchFormQuestion" ADD COLUMN     "multiple" BOOLEAN NOT NULL;
