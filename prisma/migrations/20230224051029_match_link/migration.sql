/*
  Warnings:

  - Added the required column `formId` to the `MatchFormResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchFormResponse" ADD COLUMN     "formId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MatchFormResponse" ADD CONSTRAINT "MatchFormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "MatchForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
