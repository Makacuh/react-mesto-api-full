const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, SECRET_KEY, HASH_LENGTH = 10 } = process.env;

const { customError } = require('../errors/customErrors');
const { CREATED } = require('../errors/errorStatuses');
const NotFoundError = require('../errors/notFoundError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, HASH_LENGTH).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(CREATED).header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'dev-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).header({
          'Cross-Origin-Resource-Policy': 'cross-origin',
          'Acces-Control-Allow-Credentials': 'true',
        }).send({ token });
    })
    .catch((err) => next(err));
};

const findUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(users);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Данных по указанному id нет');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Данных по указанному id нет');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Данных по указанному id нет');
    })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(() => {
    throw new NotFoundError('Данных по указанному id нет');
  })
    .then((user) => {
      res.header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      }).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

module.exports = {
  login,
  createUser,
  findUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
