// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // ambil header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // ambil setelah "Bearer"

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token tidak ditemukan. Akses ditolak.',
    });
  }

  try {
    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan payload token ke req.user
    next(); // lanjut ke controller berikutnya
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: 'Token tidak valid.',
    });
  }
};
