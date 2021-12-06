const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../configs');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация-1');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация-2');
  }

  req.user = payload;

  next();
};

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../configs');
// const Unauthorized = require('../errors/unauthorized-error');

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new Unauthorized('Необходима авторизация');
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new Unauthorized('Необходима авторизация');
//   }

//   req.user = payload;

//   next();
// };

// module.exports = auth;

