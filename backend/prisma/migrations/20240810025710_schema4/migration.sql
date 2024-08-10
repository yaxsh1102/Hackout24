/*
  Warnings:

  - Added the required column `projectId` to the `Farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "temperature10" TEXT NOT NULL,
    "moisture" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "ultravioletIndex" TEXT NOT NULL,
    "weatherGroup" TEXT NOT NULL,
    "weatherDescription" TEXT NOT NULL,
    "atmosphericTemprature" TEXT NOT NULL,
    "pressure" TEXT NOT NULL,
    "humidity" TEXT NOT NULL,
    "cloudiness" TEXT NOT NULL,
    "rainVolume3hrs" TEXT NOT NULL,
    "snowVolume3hrs" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_farmerId_key" ON "Project"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_employeeId_key" ON "Project"("employeeId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
