/*
  Warnings:

  - You are about to drop the column `work_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `Expenditure` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `File` table. All the data in the column will be lost.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `case_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `case_id` to the `Expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `case_id` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('inactive', 'active');

-- CreateEnum
CREATE TYPE "public"."CaseStatus" AS ENUM ('open', 'in_progress', 'completed', 'closed');

-- CreateEnum
CREATE TYPE "public"."PaymentTypes" AS ENUM ('cash', 'transfer', 'court');

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_work_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expenditure" DROP CONSTRAINT "Expenditure_work_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_work_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Work" DROP CONSTRAINT "Work_assigned_employee_id_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "work_id",
ADD COLUMN     "case_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Expenditure" DROP COLUMN "work_id",
ADD COLUMN     "case_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "work_id",
ADD COLUMN     "case_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'inactive';

-- DropTable
DROP TABLE "public"."Work";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "public"."Case" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "entryNumber" TEXT NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "judge" TEXT NOT NULL,
    "plaintiff" TEXT NOT NULL,
    "defendant" TEXT NOT NULL,
    "investigatedAddress" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "assigned_employee_id" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "payment_type" "public"."PaymentTypes" NOT NULL,
    "status" "public"."CaseStatus" NOT NULL,
    "closed_at" TIMESTAMP(3),

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Case" ADD CONSTRAINT "Case_assigned_employee_id_fkey" FOREIGN KEY ("assigned_employee_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "public"."Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenditure" ADD CONSTRAINT "Expenditure_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "public"."Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "public"."Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
