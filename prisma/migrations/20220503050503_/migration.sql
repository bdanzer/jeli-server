/*
  Warnings:

  - You are about to drop the column `dietType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `measurementType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `servingSize` on the `Product` table. All the data in the column will be lost.
  - Added the required column `measurementUnitType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurementValue` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dietType",
DROP COLUMN "measurementType",
DROP COLUMN "productType",
DROP COLUMN "servingSize",
ADD COLUMN     "measurementUnitType" TEXT NOT NULL,
ADD COLUMN     "measurementValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "servingType" TEXT NOT NULL;
