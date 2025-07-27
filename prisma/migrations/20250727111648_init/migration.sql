/*
  Warnings:

  - The primary key for the `Barang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `id_barang` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `nama_barang` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Barang` table. All the data in the column will be lost.
  - The primary key for the `Transaksi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bukti_pembayaran` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `grand_total` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `id_transaksi` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_number` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `jenis_transaksi` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Transaksi` table. All the data in the column will be lost.
  - The primary key for the `TransaksiDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `harga_satuan` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `id_barang` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `id_detail` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `id_transaksi` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `total_harga` on the `TransaksiDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `TransaksiDetail` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `Barang` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nama` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grandTotal` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Transaksi` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `invoiceNumber` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisTransaksi` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangId` to the `TransaksiDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hargaSatuan` to the `TransaksiDetail` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `TransaksiDetail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `totalHarga` to the `TransaksiDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaksiId` to the `TransaksiDetail` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_id_user_fkey";

-- DropForeignKey
ALTER TABLE "TransaksiDetail" DROP CONSTRAINT "TransaksiDetail_id_barang_fkey";

-- DropForeignKey
ALTER TABLE "TransaksiDetail" DROP CONSTRAINT "TransaksiDetail_id_transaksi_fkey";

-- AlterTable
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_pkey",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "id_barang",
DROP COLUMN "nama_barang",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Barang_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_pkey",
DROP COLUMN "bukti_pembayaran",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "grand_total",
DROP COLUMN "id_transaksi",
DROP COLUMN "id_user",
DROP COLUMN "invoice_number",
DROP COLUMN "jenis_transaksi",
DROP COLUMN "updated_at",
ADD COLUMN     "buktiPembayaran" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "grandTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL,
ADD COLUMN     "jenisTransaksi" "JenisTransaksi" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TransaksiDetail" DROP CONSTRAINT "TransaksiDetail_pkey",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "harga_satuan",
DROP COLUMN "id_barang",
DROP COLUMN "id_detail",
DROP COLUMN "id_transaksi",
DROP COLUMN "total_harga",
DROP COLUMN "updated_at",
ADD COLUMN     "barangId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "hargaSatuan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "totalHarga" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transaksiId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "TransaksiDetail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "id_user",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
