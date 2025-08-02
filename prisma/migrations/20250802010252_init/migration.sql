/*
  Warnings:

  - Added the required column `nama` to the `transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaksi" ADD COLUMN     "nama" TEXT NOT NULL;
