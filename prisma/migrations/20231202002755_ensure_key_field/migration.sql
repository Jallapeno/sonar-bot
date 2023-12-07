/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_key_key" ON "Folder"("key");
