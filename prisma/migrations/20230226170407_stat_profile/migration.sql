-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('MATCH', 'TEAM');

-- CreateEnum
CREATE TYPE "Operation" AS ENUM ('AVERAGE', 'MAX', 'MIN', 'TOTAL', 'FRACTION');

-- CreateTable
CREATE TABLE "StatProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProfileType" NOT NULL,
    "matchFormId" TEXT NOT NULL,

    CONSTRAINT "StatProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "operation" "Operation" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "statProfileId" TEXT,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatProfile" ADD CONSTRAINT "StatProfile_matchFormId_fkey" FOREIGN KEY ("matchFormId") REFERENCES "MatchForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistic" ADD CONSTRAINT "Statistic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MatchFormCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistic" ADD CONSTRAINT "Statistic_statProfileId_fkey" FOREIGN KEY ("statProfileId") REFERENCES "StatProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
