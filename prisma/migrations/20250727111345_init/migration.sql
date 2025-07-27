-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "JenisTransaksi" AS ENUM ('penjualan', 'pembelian');

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id_barang" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id_barang")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "jenis_transaksi" "JenisTransaksi" NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "bukti_pembayaran" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateTable
CREATE TABLE "TransaksiDetail" (
    "id_detail" TEXT NOT NULL,
    "id_transaksi" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga_satuan" DOUBLE PRECISION NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TransaksiDetail_pkey" PRIMARY KEY ("id_detail")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "Transaksi"("id_transaksi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiDetail" ADD CONSTRAINT "TransaksiDetail_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id_barang") ON DELETE RESTRICT ON UPDATE CASCADE;
