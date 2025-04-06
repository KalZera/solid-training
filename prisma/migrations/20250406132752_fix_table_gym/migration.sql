/*
  Warnings:

  - Made the column `title` on table `gyms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gyms" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
