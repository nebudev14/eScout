/*
  Warnings:

  - The values [GAMEPIECE_HEIGHT,CHARGE] on the enum `MatchQuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `MatchSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FieldNodeAction" AS ENUM ('PICKED', 'PLACED', 'DROPPED');

-- AlterEnum
BEGIN;
CREATE TYPE "MatchQuestionType_new" AS ENUM ('SCORE', 'COUNTER', 'INPUT', 'SELECT', 'BOOL', 'DEFENSE', 'GAMEPIECE_INFO', 'FIELD');
ALTER TABLE "MatchFormQuestion" ALTER COLUMN "questionType" TYPE "MatchQuestionType_new" USING ("questionType"::text::"MatchQuestionType_new");
ALTER TYPE "MatchQuestionType" RENAME TO "MatchQuestionType_old";
ALTER TYPE "MatchQuestionType_new" RENAME TO "MatchQuestionType";
DROP TYPE "MatchQuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "MatchSlot" DROP CONSTRAINT "MatchSlot_matchFormAnswersId_fkey";

-- DropTable
DROP TABLE "MatchSlot";

-- CreateTable
CREATE TABLE "ChargedField" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ChargedField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargedFieldNode" (
    "id" TEXT NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,
    "piece" "PieceType" NOT NULL,
    "action" "FieldNodeAction" NOT NULL,
    "chargedFieldId" TEXT,

    CONSTRAINT "ChargedFieldNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChargedFieldNode" ADD CONSTRAINT "ChargedFieldNode_chargedFieldId_fkey" FOREIGN KEY ("chargedFieldId") REFERENCES "ChargedField"("id") ON DELETE SET NULL ON UPDATE CASCADE;
