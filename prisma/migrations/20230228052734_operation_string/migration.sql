/*
  Warnings:

  - The `operation` column on the `Statistic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `operationType` to the `Statistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Operation" ADD VALUE 'CUSTOM';

-- AlterTable
ALTER TABLE "Statistic" ADD COLUMN     "operationType" "Operation" NOT NULL,
DROP COLUMN "operation",
ADD COLUMN     "operation" TEXT;
