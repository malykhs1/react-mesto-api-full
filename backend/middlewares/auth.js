const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;


