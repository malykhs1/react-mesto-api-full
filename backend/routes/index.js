/* eslint-disable import/extensions */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users.js');
const cardRouter = require('./cards.js');
const Unauthorized = require('../errors/unauthorized-error')

const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required().strict(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required().strict(),
  }),
}), loginUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use((req, res) => {
  throw new Unauthorized('Страница не найдена');
});

module.exports = router;
