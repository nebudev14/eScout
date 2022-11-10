/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TeamUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TeamUser_teamNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_key" ON "TeamUser"("userId");
