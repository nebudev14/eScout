/*
  Warnings:

  - You are about to drop the column `event` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `rungLevel` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `autoHighShotsMade` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autoHighShotsTotal` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autoLowShotsMade` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autoLowShotsTotal` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `climbEnd` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `climbRung` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `climbStart` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobility` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teleopHighShotsMade` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teleopHighShotsTotal` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teleopLowShotsMade` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teleopLowShotsTotal` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Entry_teamNumber_key";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "event",
DROP COLUMN "rungLevel",
ADD COLUMN     "autoHighShotsMade" INTEGER NOT NULL,
ADD COLUMN     "autoHighShotsTotal" INTEGER NOT NULL,
ADD COLUMN     "autoLowShotsMade" INTEGER NOT NULL,
ADD COLUMN     "autoLowShotsTotal" INTEGER NOT NULL,
ADD COLUMN     "climbEnd" INTEGER NOT NULL,
ADD COLUMN     "climbRung" "RungLevel" NOT NULL,
ADD COLUMN     "climbStart" INTEGER NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "defended" INTEGER[],
ADD COLUMN     "defendedBy" INTEGER[],
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "mobility" BOOLEAN NOT NULL,
ADD COLUMN     "teleopHighShotsMade" INTEGER NOT NULL,
ADD COLUMN     "teleopHighShotsTotal" INTEGER NOT NULL,
ADD COLUMN     "teleopLowShotsMade" INTEGER NOT NULL,
ADD COLUMN     "teleopLowShotsTotal" INTEGER NOT NULL;
