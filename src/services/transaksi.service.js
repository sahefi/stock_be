// src/services/transaksi.service.js
const prisma = require('../prisma');

async function createTransaksi(payload) {
  const { detail, ...transaksiData } = payload;

  // Buat invoice_number baru
  const invoice_number = await generateInvoiceNumber();

  const transaksi = await prisma.transaksi.create({
    data: {
      ...transaksiData,
      invoice_number,
      detail: {
        create: detail,
      },
    },
    include: {
      detail: true,
    },
  });

  return transaksi;
}

async function getAllTransaksi() {
  const data = await prisma.transaksi.findMany({
    include: { detail: true }
  });
  return { list: data };
}

async function getAllTransaksiDetail() {
  const data = await prisma.transaksi_detail.findMany({
    include: {
      barang: {
        select: {
          nama: true, // alias sebagai nama_barang nanti
        },
      },
      transaksi: {
        select: {
          invoice_number: true,
        },
      },
    },
  });

  // Ubah struktur respons agar `nama_barang` dan `invoice_number` ada di root
  const result = data.map((item) => ({
    ...item,
    nama_barang: item.barang?.nama ?? null,
    invoice_number: item.transaksi?.invoice_number ?? null,
    // opsional: bisa hapus relasi asli jika tidak ingin dikirim
    barang: undefined,
    transaksi: undefined,
  }));

  return { list: result };
}

async function getTransaksiById(id) {
  const transaksi = await prisma.transaksi.findUnique({
    where: { id },
    include: { detail: true }
  });
  if (!transaksi) throw new Error('Transaksi tidak ditemukan');
  return transaksi;
}

async function updateTransaksi(id, payload) {
  const { detail, ...transaksiData } = payload;

  // Update transaksi utama
  const updatedTransaksi = await prisma.transaksi.update({
    where: { id },
    data: transaksiData
  });

  // Ambil semua existing detail dari DB
  const existingDetailIds = detail.filter(d => d.id).map(d => d.id);
  
  // Hapus detail yang sudah tidak ada di request
  await prisma.transaksi_detail.deleteMany({
    where: {
      transaksi_id: id,
      NOT: {
        id: { in: existingDetailIds }
      }
    }
  });

  // Proses masing-masing detail
  for (const item of detail) {
    console.log(item);
    
    if (item.id) {
      // Update existing detail
      const { id: detailId, ...dataToUpdate } = item;
      await prisma.transaksi_detail.update({
        where: { id: detailId },
        data: dataToUpdate
      });
    } else {
      // Create new detail
      await prisma.transaksi_detail.create({
        data: {
          ...item,
          transaksi_id: id
        }
      });
    }
  }

  // Return final data with detail
  return await prisma.transaksi.findUnique({
    where: { id },
    include: { detail: true }
  });
}


async function deleteTransaksi(id) {
  await prisma.transaksi_detail.deleteMany({ where: { transaksi_id: id } });
  await prisma.transaksi.delete({ where: { id } });
  return { message: 'Transaksi berhasil dihapus' };
}

async function generateInvoiceNumber() {
  // Ambil transaksi terakhir berdasarkan invoice_number descending
  const lastTransaksi = await prisma.transaksi.findFirst({
    orderBy: {
      invoice_number: 'desc',
    },
    where: {
      invoice_number: {
        startsWith: 'INV',
      },
    },
    select: {
      invoice_number: true,
    },
  });

  let newNumber = 1;
  if (lastTransaksi && lastTransaksi.invoice_number) {
    // Ambil angka dari format 'INV001'
    const match = lastTransaksi.invoice_number.match(/INV(\d+)/);
    if (match) {
      newNumber = parseInt(match[1]) + 1;
    }
  }

  // Format jadi INV dengan 3 digit padding nol
  return `INV${String(newNumber).padStart(3, '0')}`;
}

module.exports = {
  createTransaksi,
  getAllTransaksi,
  getAllTransaksiDetail,
  getTransaksiById,
  updateTransaksi,
  deleteTransaksi
};
