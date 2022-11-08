-- CreateEnum
CREATE TYPE "PitQuestionType" AS ENUM ('TEXT', 'SELECT');

-- DropIndex
DROP INDEX "Entry_teamNumber_key";

-- DropIndex
DROP INDEX "Entry_userId_key";

-- CreateTable
CREATE TABLE "PitForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamNumber" INTEGER NOT NULL,

    CONSTRAINT "PitForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitQuestion" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "PitQuestionType" NOT NULL,
    "possibleResponses" TEXT[],
    "pitFormId" TEXT NOT NULL,

    CONSTRAINT "PitQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitResponse" (
    "id" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "pitQuestionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pitFormId" TEXT,

    CONSTRAINT "PitResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PitForm_name_key" ON "PitForm"("name");

-- AddForeignKey
ALTER TABLE "PitForm" ADD CONSTRAINT "PitForm_teamNumber_fkey" FOREIGN KEY ("teamNumber") REFERENCES "Team"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitQuestion" ADD CONSTRAINT "PitQuestion_pitFormId_fkey" FOREIGN KEY ("pitFormId") REFERENCES "PitForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitResponse" ADD CONSTRAINT "PitResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitResponse" ADD CONSTRAINT "PitResponse_pitFormId_fkey" FOREIGN KEY ("pitFormId") REFERENCES "PitForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitResponse" ADD CONSTRAINT "PitResponse_pitQuestionId_fkey" FOREIGN KEY ("pitQuestionId") REFERENCES "PitQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
