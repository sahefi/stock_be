// src/services/auth.service.js

const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const jwt = require('jsonwebtoken');

async function register({ user_name, email, password }) {
  // cek apakah email sudah terdaftar
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('Email sudah terdaftar');
    error.statusCode = 400;
    throw error;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // simpan user baru
  const newUser = await prisma.user.create({
    data: {
      user_name,
      email,
      password: hashedPassword,
      role: 'user',
    },
    select: {
      id: true,
      user_name: true,
      email: true,
      role: true,
      created_at: true,
    },
  });

  return newUser;
}


async function login({ email, password }) {
  // cari user
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    const error = new Error('Email tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  // cek password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error('Password salah');
    error.statusCode = 401;
    throw error;
  }

  // generate token
  const token = jwt.sign(
    {
      id: user.id, // pastikan sesuai nama kolom di prisma
      user_name: user.user_name,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // siapkan data user tanpa password
  const { password: _, ...userWithoutPassword } = user;

  return {
    access_token: token,
    user: userWithoutPassword
  };
}

async function updateProfile(userId, data) {

  if (data.email) {
    const existing = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: { id: userId }
      }
    });

    if (existing) {
      const error = new Error('Email sudah digunakan oleh user lain');
      error.statusCode = 400;
      throw error;
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: data,
    select: {
      id: true,
      user_name: true,
      email: true,
      role: true,
      created_at: true,
    },
  });

  return updatedUser;
}

module.exports = { register,login, updateProfile };
