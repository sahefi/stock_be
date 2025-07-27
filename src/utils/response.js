// utils/response.js
function success(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

function error(res, message, statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors,
  });
}

module.exports = { success, error }; 