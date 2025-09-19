/*
  Warnings:

  - You are about to drop the column `author_id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Note` table. All the data in the column will be lost.
  - Added the required column `description` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_author_id_fkey";

-- AlterTable
ALTER TABLE "public"."Note" DROP COLUMN "author_id",
DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
