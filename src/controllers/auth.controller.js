const { success } = require('../utils/response');
const authService = require('../services/auth.service');
const only = require('../utils/only');

exports.register = async (req, res, next) => {
  try {
    const { user_name, email, password } = req.body;
    const user = await authService.register({ user_name, email, password });

    return success(res, 'Registrasi berhasil', user, 201);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Panggil service
    const result = await authService.login({ email, password });

    // Tambahkan set cookie
    res.cookie('token', result.access_token, {
      httpOnly: true,          // tidak bisa diakses oleh JS di browser
      secure: false,           // true kalau sudah HTTPS
      sameSite: 'strict',      // cegah CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
    });

    // Kirim response
    return success(res, 'Login berhasil', result, 200);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {    
    const payload = only(req.body, ['user_name', 'email']);
    payload.id = req.user.id;
    const auth = await authService.updateProfile(payload.id, payload);
    return success(res, 'Barang berhasil diperbarui', auth);
  } catch (err) {
    next(err);
  }
};