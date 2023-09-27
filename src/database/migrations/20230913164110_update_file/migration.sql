/*
  Warnings:

  - You are about to drop the column `key` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "File_key_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "key",
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");
