const { body } = require('express-validator');

const detailValidation = [
  body('detail').isArray({ min: 1 }).withMessage('Detail harus berupa array dan tidak boleh kosong'),
  body('detail.*.barang_id').notEmpty().withMessage('barang_id tidak boleh kosong'),
  body('detail.*.jumlah').isInt({ min: 1 }).withMessage('jumlah harus bilangan bulat minimal 1'),
  body('detail.*.harga_satuan').isFloat({ min: 0 }).withMessage('harga_satuan harus berupa angka minimal 0'),
  body('detail.*.total_harga').isFloat({ min: 0 }).withMessage('total_harga harus berupa angka minimal 0'),
];

exports.createTransaksiRequest = [
  body('user_id').notEmpty().withMessage('user_id tidak boleh kosong'),
  body('nama').notEmpty().withMessage('nama tidak boleh kosong'),
  body('jenis_transaksi')
    .isIn(['penjualan', 'pembelian'])
    .withMessage('jenis_transaksi harus penjualan atau pembelian'),  
  body('tanggal').isISO8601().withMessage('tanggal harus format ISO (yyyy-mm-dd)'),
  body('grand_total').isFloat({ min: 0 }).withMessage('grand_total harus berupa angka minimal 0'),
  ...detailValidation,
];

exports.updateTransaksiRequest = [
  body('user_id').optional().notEmpty().withMessage('user_id tidak boleh kosong'),
  body('nama').optional().notEmpty().withMessage('nama tidak boleh kosong'),
  body('jenis_transaksi')
    .optional()
    .isIn(['penjualan', 'pembelian'])
    .withMessage('jenis_transaksi harus penjualan atau pembelian'),
  body('invoice_number').optional().notEmpty().withMessage('invoice_number tidak boleh kosong'),
  body('tanggal').optional().isISO8601().withMessage('tanggal harus format ISO (yyyy-mm-dd)'),
  body('grand_total').optional().isFloat({ min: 0 }).withMessage('grand_total harus berupa angka minimal 0'),
  ...detailValidation,
];
