require('dotenv').config();

const { PORT = 3000, JWT_SECRET = '1b15f173030bcb73df6e84f48acfdb3cb2dc402941eb30e634aa30fdd8bd5fdd' } = process.env;

const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
