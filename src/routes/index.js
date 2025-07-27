// src/routes/index.js
const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/auth.controller');
const barangController = require('../controllers/barang.controller');

// validation rules
const { registerRequest, loginRequest } = require('../requests/auth.request');

// middleware untuk cek hasil validasi
const validateRequest = require('../middlewares/validateRequest');
const { createRequest } = require('../requests/barang.request');

const authMiddleware = require('../middlewares/auth.middleware');

// daftar route

// auth
router.post('/auth/register', registerRequest, validateRequest, authController.register);
router.post('/auth/login', loginRequest, validateRequest, authController.login);

// barang (bukan user create, tapi barang create)
router.post('/barang/create',authMiddleware, createRequest, validateRequest, barangController.create);

module.exports = router;
