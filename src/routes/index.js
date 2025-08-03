const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/auth.controller');
const barangController = require('../controllers/barang.controller');
const transaksiController = require('../controllers/transaksi.controller');
const authenticateUser = require('../middlewares/authenticateUser');

// validation rules
const { registerRequest, loginRequest, profileRequest } = require('../requests/auth.request');
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
router.post('/auth/profile', authMiddleware,authenticateUser,profileRequest, validateRequest, authController.updateProfile);
router.get('/auth/me', authMiddleware,authenticateUser,authController.authMe);

// ===================
// Barang Routes
// ===================

// Create barang
router.post(
    '/barang',
    authMiddleware,
    authenticateUser,
    createRequest,
    validateRequest,
    barangController.create
);

// Get all barang
router.get(
    '/barang',
    authMiddleware,
    authenticateUser,
    barangController.getAll
);

// Get barang by ID
router.get(
    '/barang/:id',
    authMiddleware,
    authenticateUser,
    barangController.getById
);

// Update barang
router.put(
    '/barang',
    authMiddleware,
    authenticateUser,
    updateRequest,
    validateRequest,
    barangController.update
);

// Delete barang
router.delete(
    '/barang/:id',
    authMiddleware,
    authenticateUser,
    barangController.remove
);

// ===================
// Transaksi Routes
// ===================

// Create transaksi
router.post(
    '/laporan',
    authMiddleware,
    authenticateUser,
    createTransaksiRequest,
    validateRequest,
    transaksiController.create
);

// Get all transaksi
router.get('/laporan', authMiddleware,
    authenticateUser, transaksiController.getAll);

// Get transaksi by ID
router.get('/laporan/:id', authMiddleware,
    authenticateUser, transaksiController.getById);

// Update transaksi
router.put(
    '/laporan',
    authMiddleware,
    authenticateUser,
    updateTransaksiRequest,
    validateRequest,
    transaksiController.update
);

// Delete transaksi
router.delete('/laporan/:id', authMiddleware,
    authenticateUser, transaksiController.delete);

// Get all transaksi detail
router.get('/transaksi', authMiddleware,
    authenticateUser, transaksiController.getAllDetail);

module.exports = router;
