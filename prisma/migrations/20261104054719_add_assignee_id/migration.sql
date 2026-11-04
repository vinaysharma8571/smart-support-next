/*
  Warnings:

  - You are about to drop the column `assigneeID` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assigneeID",
ADD COLUMN     "assigneeId" TEXT;
