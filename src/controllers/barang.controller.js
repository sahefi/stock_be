const barangService = require('../services/barang.service');
const { success } = require('../utils/response');
const only = require('../utils/only');



exports.create = async (req, res, next) => {
  try {
    const payload = only(req.body, ['nama', 'kategori', 'stok', 'satuan', 'user_id']);
    payload.user_id = req.user.id;    
    
    const barang = await barangService.createBarang(payload);
    return success(res, 'Barang berhasil dibuat', barang, 201);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await barangService.getAllBarang();
    return success(res, 'Daftar barang berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('hii' + id);
    
    const barang = await barangService.getBarangById(id);
    return success(res, 'Barang berhasil ditemukan', barang);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {    
    const payload = only(req.body, ['id','nama', 'kategori', 'stok', 'satuan', 'user_id']);
    payload.user_id = req.user.id;
    const barang = await barangService.updateBarang(payload.id, payload);
    return success(res, 'Barang berhasil diperbarui', barang);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await barangService.deleteBarang(id);
    return success(res, result.message);
  } catch (err) {
    next(err);
  }
};