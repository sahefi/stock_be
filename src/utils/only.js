module.exports = function only(obj, keys) {
  const result = {};
  keys.forEach((key) => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });
  return result;
};