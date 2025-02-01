/*
  Warnings:

  - You are about to drop the column `stripeCurrentPeriodStart` on the `user_subscriptions` table. All the data in the column will be lost.
  - Added the required column `stripeCurrentPeriodEnd` to the `user_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_subscriptions" DROP COLUMN "stripeCurrentPeriodStart",
ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3) NOT NULL;
