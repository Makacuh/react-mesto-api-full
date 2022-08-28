/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../environment/env');
const AuthorizationError = require('../errors/authorizationError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    const err = new AuthorizationError('Необходима авторизация!');
    next(err);
  }
  req.user = payload;
  return next();
};
