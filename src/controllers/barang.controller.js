const barangService = require('../services/barang.service');
const { success } = require('../utils/response');
const only = require('../utils/only');

exports.create = async (req, res, next) => {
  try {
    const payload = only(req.body, ['nama', 'kategori', 'stok', 'satuan', 'user_id']);
    const barang = await barangService.createBarang(payload);
    return success(res, 'Barang berhasil dibuat', barang, 201);
  } catch (err) {
    next(err);
  }
};