/*
  Warnings:

  - You are about to drop the column `teamNumber` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[competitionName]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionName` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_teamNumber_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "teamNumber",
ADD COLUMN     "competitionName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Competition" (
    "name" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_name_key" ON "Competition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_competitionName_key" ON "Entry"("competitionName");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_key" ON "Entry"("userId");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_competitionName_fkey" FOREIGN KEY ("competitionName") REFERENCES "Competition"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
