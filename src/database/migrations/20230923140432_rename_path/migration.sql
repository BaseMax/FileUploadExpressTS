/*
  Warnings:

  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_path_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "path",
ADD COLUMN     "key" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "File"("key");
