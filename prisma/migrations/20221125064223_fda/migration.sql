/*
  Warnings:

  - The primary key for the `TeamUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `TeamUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `TeamUser` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `id` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" SET NOT NULL;

-- AlterTable
ALTER TABLE "TeamUser" DROP CONSTRAINT "TeamUser_pkey",
ADD COLUMN     "teamId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus";

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_key" ON "TeamUser"("userId");
