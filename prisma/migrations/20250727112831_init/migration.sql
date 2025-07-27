/*
  Warnings:

  - You are about to drop the `Barang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransaksiDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransaksiDetail" DROP CONSTRAINT "TransaksiDetail_barangId_fkey";

-- DropForeignKey
ALTER TABLE "TransaksiDetail" DROP CONSTRAINT "TransaksiDetail_transaksiId_fkey";

-- DropTable
DROP TABLE "Barang";

-- DropTable
DROP TABLE "Transaksi";

-- DropTable
DROP TABLE "TransaksiDetail";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "jenis_transaksi" "JenisTransaksi" NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "bukti_pembayaran" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi_detail" (
    "id" TEXT NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "barang_id" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga_satuan" DOUBLE PRECISION NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transaksi_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi_detail" ADD CONSTRAINT "transaksi_detail_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi_detail" ADD CONSTRAINT "transaksi_detail_barang_id_fkey" FOREIGN KEY ("barang_id") REFERENCES "barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
