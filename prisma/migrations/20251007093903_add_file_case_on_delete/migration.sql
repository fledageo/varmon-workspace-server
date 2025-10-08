-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_case_id_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
