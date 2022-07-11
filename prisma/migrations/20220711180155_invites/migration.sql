/*
  Warnings:

  - A unique constraint covering the columns `[teamNumber]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_teamNumber_key" ON "Invite"("teamNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_teamNumber_key" ON "Entry"("teamNumber");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
