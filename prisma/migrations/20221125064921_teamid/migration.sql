/*
  Warnings:

  - You are about to drop the column `teamNumber` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `teamNumber` on the `PitForm` table. All the data in the column will be lost.
  - You are about to drop the column `teamNumber` on the `TeamUser` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `matchType` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `climbRung` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `teamId` to the `PitForm` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `PitQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `teamId` on table `TeamUser` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `TeamUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_teamNumber_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_teamNumber_fkey";

-- DropForeignKey
ALTER TABLE "PitForm" DROP CONSTRAINT "PitForm_teamNumber_fkey";

-- DropForeignKey
ALTER TABLE "TeamUser" DROP CONSTRAINT "TeamUser_teamNumber_fkey";

-- DropIndex
DROP INDEX "Team_number_key";

-- DropIndex
DROP INDEX "TeamUser_userId_key";

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "teamNumber",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "teamId" TEXT NOT NULL,
DROP COLUMN "matchType",
ADD COLUMN     "matchType" "MatchType" NOT NULL,
DROP COLUMN "climbRung",
ADD COLUMN     "climbRung" "RungLevel" NOT NULL;

-- AlterTable
ALTER TABLE "PitForm" DROP COLUMN "teamNumber",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PitQuestion" DROP COLUMN "type",
ADD COLUMN     "type" "PitQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TeamUser" DROP COLUMN "teamNumber",
ALTER COLUMN "teamId" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL,
ADD CONSTRAINT "TeamUser_pkey" PRIMARY KEY ("userId", "teamId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitForm" ADD CONSTRAINT "PitForm_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
