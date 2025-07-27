const { body } = require('express-validator');

exports.createRequest = [
    body('nama').notEmpty().withMessage('Nama barang wajib diisi'),

    body('kategori').notEmpty().withMessage('Kategori barang wajib diisi'),

    body('stok').isInt({ min: 0 }).withMessage('Stok harus berupa angka dan minimal 0'),

    body('satuan').notEmpty().withMessage('Satuan wajib diisi'),

    body('user_id').notEmpty().withMessage('User ID wajib diisi').isUUID().withMessage('User ID harus berupa UUID yang valid'),
];
