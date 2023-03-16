/*
  Warnings:

  - The values [PLACED] on the enum `FieldNodeAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FieldNodeAction_new" AS ENUM ('MOVEMENT', 'PICKED', 'SCORE', 'DROPPED');
ALTER TABLE "ChargedFieldNode" ALTER COLUMN "action" TYPE "FieldNodeAction_new" USING ("action"::text::"FieldNodeAction_new");
ALTER TYPE "FieldNodeAction" RENAME TO "FieldNodeAction_old";
ALTER TYPE "FieldNodeAction_new" RENAME TO "FieldNodeAction";
DROP TYPE "FieldNodeAction_old";
COMMIT;
