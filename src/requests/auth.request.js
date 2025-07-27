const { body } = require('express-validator');

exports.registerRequest = [
  body('user_name').notEmpty().withMessage('User name wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];


exports.loginRequest = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];