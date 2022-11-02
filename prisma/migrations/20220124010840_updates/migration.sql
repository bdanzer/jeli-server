/*
  Warnings:

  - Added the required column `name` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Programs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Programs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ExercsiseLog" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "products" JSONB[];

-- AlterTable
ALTER TABLE "NutritionLog" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loggedMeals" JSONB[],
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NutritionLogTemplate" ADD COLUMN     "templateStructure" JSONB[];

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "amazonAffiliate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Programs" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
