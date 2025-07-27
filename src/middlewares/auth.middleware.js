const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // ambil token dari cookies
  const token = req.cookies.token; // pastikan nama cookie sama waktu login (res.cookie('token', ...))

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token tidak ditemukan di cookies. Akses ditolak.',
    });
  }

  try {
    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan payload token ke req.user
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: 'Token tidak valid.',
    });
  }
};
