/*
  Warnings:

  - You are about to drop the column `atmosphericTemprature` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `cloudiness` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `moisture` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `pressure` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `rainVolume3hrs` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `snowVolume3hrs` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `temperature10` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ultravioletIndex` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `weatherDescription` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `weatherGroup` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "atmosphericTemprature",
DROP COLUMN "cloudiness",
DROP COLUMN "humidity",
DROP COLUMN "moisture",
DROP COLUMN "pressure",
DROP COLUMN "rainVolume3hrs",
DROP COLUMN "snowVolume3hrs",
DROP COLUMN "temperature",
DROP COLUMN "temperature10",
DROP COLUMN "ultravioletIndex",
DROP COLUMN "weatherDescription",
DROP COLUMN "weatherGroup";
