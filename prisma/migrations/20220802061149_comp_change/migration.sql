/*
  Warnings:

  - You are about to drop the column `competitionName` on the `Entry` table. All the data in the column will be lost.
  - The required column `id` was added to the `Competition` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `compId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_competitionName_fkey";

-- DropIndex
DROP INDEX "Competition_name_key";

-- DropIndex
DROP INDEX "Entry_competitionName_key";

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Competition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "competitionName",
ADD COLUMN     "compId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
