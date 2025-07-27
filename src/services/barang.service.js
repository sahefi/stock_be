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

  const barang = await prisma.barang.create({
    data: payload
  });
  return barang;
}

module.exports = {
  createBarang
};
