// middlewares/errorHandler.js
module.exports = function (err, req, res, next) {
  console.error('Error Handler:', err);

  // Jika sudah ada statusCode dari service
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};
