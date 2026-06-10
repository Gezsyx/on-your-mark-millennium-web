/*
  Warnings:

  - You are about to drop the column `foto` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `foto`,
    ADD COLUMN `image` VARCHAR(191) NULL;
