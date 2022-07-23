/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creatorId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_members` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('CREATOR', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_teamNumber_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_A_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_B_fkey";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "creatorId",
ADD COLUMN     "inviteId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Invite";

-- DropTable
DROP TABLE "_members";

-- CreateTable
CREATE TABLE "TeamUser" (
    "userId" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "status" "MemberStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_key" ON "TeamUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_inviteId_key" ON "Team"("inviteId");

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
