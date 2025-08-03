const { body } = require('express-validator');

exports.createRequest = [
    body('nama').notEmpty().withMessage('Nama barang wajib diisi'),

    body('kategori').notEmpty().withMessage('Kategori barang wajib diisi'),

    body('stok').isInt({ min: 0 }).withMessage('Stok harus berupa angka dan minimal 0'),

    body('satuan').notEmpty().withMessage('Satuan wajib diisi'),    
];


exports.updateRequest = [
  body('nama')
    .optional()
    .notEmpty()
    .withMessage('Nama barang tidak boleh kosong'),

  body('kategori')
    .optional()
    .notEmpty()
    .withMessage('Kategori barang tidak boleh kosong'),

  body('stok')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stok harus berupa angka dan minimal 0'),

  body('satuan')
    .optional()
    .notEmpty()
    .withMessage('Satuan tidak boleh kosong'),
  
];
