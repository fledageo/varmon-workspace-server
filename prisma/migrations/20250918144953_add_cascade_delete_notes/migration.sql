-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_case_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "public"."Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
