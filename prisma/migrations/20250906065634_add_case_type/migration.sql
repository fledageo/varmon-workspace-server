/*
  Warnings:

  - The values [open] on the enum `CaseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CaseStatus_new" AS ENUM ('waiting', 'in_progress', 'completed', 'closed');
ALTER TABLE "public"."Case" ALTER COLUMN "status" TYPE "public"."CaseStatus_new" USING ("status"::text::"public"."CaseStatus_new");
ALTER TYPE "public"."CaseStatus" RENAME TO "CaseStatus_old";
ALTER TYPE "public"."CaseStatus_new" RENAME TO "CaseStatus";
DROP TYPE "public"."CaseStatus_old";
COMMIT;
