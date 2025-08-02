const transaksiService = require('../services/transaksi.service');
const only = require('../utils/only');
const { success } = require('../utils/response');

exports.create = async (req, res, next) => {
    try {
        const payload = only(req.body, [
            'user_id',
            'nama',
            'jenis_transaksi',
            'invoice_number',
            'tanggal',
            'grand_total',
            'detail'
        ]);
        const data = await transaksiService.createTransaksi(payload);
        return success(res, 'Laporan berhasil dibuat', data);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const data = await transaksiService.getAllTransaksi();
        return success(res, 'List laporan', data);
    } catch (err) {
        next(err);
    }
};

exports.getAllDetail = async (req, res, next) => {
    try {
        const data = await transaksiService.getAllTransaksiDetail();
        return success(res, 'List transaksi', data);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await transaksiService.getTransaksiById(req.params.id);
        return success(res, 'Laporan ditemukan', data);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
         const payload = only(req.body, [
            'id',
            'user_id',
            'nama',
            'jenis_transaksi',
            'invoice_number',
            'tanggal',
            'grand_total',
            'detail'
        ]);
        const data = await transaksiService.updateTransaksi(payload.id, payload);
        return success(res, 'Laporan berhasil diupdate', data);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const data = await transaksiService.deleteTransaksi(req.params.id);
        return success(res, data.message);
    } catch (err) {
        next(err);
    }
};