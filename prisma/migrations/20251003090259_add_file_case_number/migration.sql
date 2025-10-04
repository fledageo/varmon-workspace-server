/*
  Warnings:

  - You are about to drop the column `uploader_id` on the `File` table. All the data in the column will be lost.
  - Added the required column `caseNumber` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_uploader_id_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "uploader_id",
ADD COLUMN     "caseNumber" TEXT NOT NULL;
