const { success } = require('../utils/response');
const authService = require('../services/auth.service');

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
    const result = await authService.login({ email, password });
    return success(res, 'Login berhasil', result, 200);
  } catch (err) {
    next(err);
  }
};