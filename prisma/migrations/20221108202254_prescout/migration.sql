/*
  Warnings:

  - Added the required column `prescout` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "prescout" BOOLEAN NOT NULL,
ADD COLUMN     "video" TEXT;
