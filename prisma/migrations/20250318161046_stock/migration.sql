/*
  Warnings:

  - Made the column `stock` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "stock" SET NOT NULL,
ALTER COLUMN "stock" DROP DEFAULT;
