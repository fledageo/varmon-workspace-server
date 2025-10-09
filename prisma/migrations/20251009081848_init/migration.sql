-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('inactive', 'active');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('waiting', 'in_progress', 'completed', 'closed', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentTypes" AS ENUM ('cash', 'transfer', 'court', 'for_free');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'inactive',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
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
    "payment_type" "PaymentTypes" NOT NULL,
    "status" "CaseStatus" NOT NULL,
    "closed_at" TIMESTAMP(3),
    "isPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenditure" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "case_id" INTEGER NOT NULL,

    CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caseNumber" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assigned_employee_id_fkey" FOREIGN KEY ("assigned_employee_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;
