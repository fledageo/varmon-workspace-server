-- DropForeignKey
ALTER TABLE "public"."Expenditure" DROP CONSTRAINT "Expenditure_case_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Expenditure" ADD CONSTRAINT "Expenditure_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "public"."Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
