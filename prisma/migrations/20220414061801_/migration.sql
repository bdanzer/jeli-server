/*
  Warnings:

  - You are about to drop the column `amazonAffiliate` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "NutritionLog_nutritionLogTemplateId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "amazonAffiliate";
