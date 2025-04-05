/*
  Warnings:

  - You are about to drop the column `latitude` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "latitude",
DROP COLUMN "longitude";
