/*
  Warnings:

  - A unique constraint covering the columns `[teamNumber]` on the table `TeamUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TeamUser_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_teamNumber_key" ON "TeamUser"("teamNumber");
