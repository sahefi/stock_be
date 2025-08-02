const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/auth.controller');
const barangController = require('../controllers/barang.controller');
const transaksiController = require('../controllers/transaksi.controller');

// validation rules
const { registerRequest, loginRequest } = require('../requests/auth.request');
const { createRequest, updateRequest } = require('../requests/barang.request');

// middleware
const validateRequest = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/auth.middleware');
const { updateTransaksiRequest, createTransaksiRequest } = require('../requests/transaksi.request');

// ===================
// Auth Routes
// ===================
router.post('/auth/register', registerRequest, validateRequest, authController.register);
router.post('/auth/login', loginRequest, validateRequest, authController.login);

// ===================
// Barang Routes
// ===================

// Create barang
router.post(
    '/barang',
    authMiddleware,
    createRequest,
    validateRequest,
    barangController.create
);

// Get all barang
router.get(
    '/barang',
    authMiddleware,
    barangController.getAll
);

// Get barang by ID
router.get(
    '/barang/:id',
    authMiddleware,
    barangController.getById
);

// Update barang
router.put(
    '/barang',
    authMiddleware,
    updateRequest,
    validateRequest,
    barangController.update
);

// Delete barang
router.delete(
    '/barang/:id',
    authMiddleware,
    barangController.remove
);

// ===================
// Transaksi Routes
// ===================

// Create transaksi
router.post(
    '/laporan',
    authMiddleware,
    createTransaksiRequest,
    validateRequest,
    transaksiController.create
);

// Get all transaksi
router.get('/laporan', authMiddleware, transaksiController.getAll);

// Get transaksi by ID
router.get('/laporan/:id', authMiddleware, transaksiController.getById);

// Update transaksi
router.put(
    '/laporan',
    authMiddleware,
    updateTransaksiRequest,
    validateRequest,
    transaksiController.update
);

// Delete transaksi
router.delete('/laporan/:id', authMiddleware, transaksiController.delete);

// Get all transaksi detail
router.get('/transaksi', authMiddleware, transaksiController.getAllDetail);

module.exports = router;
