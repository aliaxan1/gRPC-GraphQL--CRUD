-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NotSpecified');

-- CreateTable
CREATE TABLE "Student" (
    "rollNo" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CNIC" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'NotSpecified',
    "isActiveStudent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollNo")
);
