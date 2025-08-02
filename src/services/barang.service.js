const prisma = require('../prisma');

async function createBarang(payload) {
  const user = await prisma.user.findUnique({
    where: { id: payload.user_id }
  });
  if (!user) {
    const error = new Error('User tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const barang = await prisma.barang.create({ data: payload });
  return barang;
}

async function getAllBarang() {
  const data = await prisma.barang.findMany();
  return { list: data }; // Bungkus dalam "list"
}

async function getBarangById(id) {
  console.log(id);
  
  const barang = await prisma.barang.findFirst({ where: { id } });
  if (!barang) {
    const error = new Error('Barang tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return barang;
}

async function updateBarang(id, payload) {
  await getBarangById(id); // pastikan barangnya ada dulu

  const barang = await prisma.barang.update({
    where: { id },
    data: payload
  });
  return barang;
}

async function deleteBarang(id) {
  await getBarangById(id); // pastikan barangnya ada dulu

  await prisma.barang.delete({ where: { id } });
  return { message: 'Barang berhasil dihapus' };
}

module.exports = {
  createBarang,
  getAllBarang,
  getBarangById,
  updateBarang,
  deleteBarang
};
