/*
  Warnings:

  - You are about to drop the `pembicaras` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pembicara_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pembicaras" DROP CONSTRAINT "pembicaras_event_id_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "pembicaras";

-- CreateTable
CREATE TABLE "pembicara" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "pembicara_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "pembicara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
