const { validationResult } = require('express-validator');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0]; //ambil error pertama saja
    return res.status(422).json({
      status: 'error',
      message: firstError.msg, // langsung kirim pesan error pertama
      field: firstError.path,  // optional: kirim juga field yang error
    });
  }
  next();
};
