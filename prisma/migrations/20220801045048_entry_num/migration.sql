/*
  Warnings:

  - A unique constraint covering the columns `[teamNumber]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamNumber` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "teamNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_teamNumber_key" ON "Entry"("teamNumber");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
