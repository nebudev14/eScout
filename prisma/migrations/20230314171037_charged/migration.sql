/*
  Warnings:

  - You are about to drop the column `chargedFieldId` on the `ChargedFieldNode` table. All the data in the column will be lost.
  - You are about to drop the column `multiple` on the `MatchFormQuestion` table. All the data in the column will be lost.
  - You are about to drop the `ChargedField` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChargedFieldNode" DROP CONSTRAINT "ChargedFieldNode_chargedFieldId_fkey";

-- AlterTable
ALTER TABLE "ChargedFieldNode" DROP COLUMN "chargedFieldId",
ADD COLUMN     "matchFormAnswersId" TEXT;

-- AlterTable
ALTER TABLE "Gamepiece" ADD COLUMN     "matchFormAnswersId" TEXT;

-- AlterTable
ALTER TABLE "MatchFormQuestion" DROP COLUMN "multiple";

-- DropTable
DROP TABLE "ChargedField";

-- AddForeignKey
ALTER TABLE "Gamepiece" ADD CONSTRAINT "Gamepiece_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargedFieldNode" ADD CONSTRAINT "ChargedFieldNode_matchFormAnswersId_fkey" FOREIGN KEY ("matchFormAnswersId") REFERENCES "MatchFormAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
