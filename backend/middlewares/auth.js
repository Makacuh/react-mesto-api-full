/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new AuthorizationError('Необходима авторизация!');
    next(err);
  }
  req.user = payload;
  return next();
};
