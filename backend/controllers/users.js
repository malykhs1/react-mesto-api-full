// // const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const { SALT_RAUND, JWT_SECRET } = require('../configs');
// const NotFoundError = require('../errors/not-found-error');
// const BadRequest = require('../errors/bad-request');
// const Conflict = require('../errors/conflict-error');
// const Unauthorized = require('../errors/unauthorized-error');

// const getUsers = (req, res, next) => User.find({})
//   .then((users) => res.status(200).send(users))
//   .catch(next);

// const getUserId = (req, res, next) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (user) {
//         return res.status(200).send(user);
//       }
//       throw new NotFoundError('Нет пользователя с таким id');
//     })
//     .catch((e) => {
//       if (e.name === 'CastError') {
//         next(new BadRequest('Переданы некорректные данные'));
//       } next(e);
//     });
// };

// const getCurrentUser = (req, res, next) => {
//   User.findById(req.user._id)
//     .then((user) => {
//       if (user) {
//         return res.status(200).send(user);
//       }
//       throw new NotFoundError('Токен не найден');
//     })
//     .catch((e) => {
//       if (e.name === 'CastError') {
//         next(new BadRequest('Переданы некорректные данные'));
//       } next(e);
//     });
// };

// const createUser = (req, res, next) => {
//   const {
//     email, password, name, about, avatar,
//   } = req.body;

//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         throw new Conflict('Такой email уже существует');
//       }
//       return bcrypt.hash(password, SALT_RAUND);
//     })
//     .then((hash) => {
//       User.create({
//         email, password: hash, name, about, avatar,
//       })
//         .then((user) => res.status(201).send({
//           _id: user._id,
//           email: user.email,
//         }))
//         .catch(next);
//     })
//     .catch((e) => {
//       if (e.name === 'CastError') {
//         next(new BadRequest('Переданы некорректные данные'));
//       } next(e);
//     });
// };

// const loginUser = (req, res, next) => {
//   const { password, email } = req.body;

//   User.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new Unauthorized('Неверный пароль или email');
//       }

//       return bcrypt.compare(password, user.password)

//         .then((matched) => {
//           if (!matched) {
//             throw new Unauthorized('Неверный пароль или email');
//           }
//           return user;
//         });
//     })
//     .then((user) => {
//       const token = jwt.sign({
//         _id: user._id,
//       }, JWT_SECRET, { expiresIn: '7d' });
//       return res.status(201).send({ token });
//     })
//     .catch(next);
// };

// const updateAvatar = (req, res, next) => User.findByIdAndUpdate(req.user._id, { ...req.body },
//   {
//     new: true,
//     runValidators: true,
//   })
//   .then((user) => res.status(200).send(user))
//   .catch((e) => {
//     if (e.name === 'CastError') {
//       next(new BadRequest('Переданы некорректные данные'));
//     } next(e);
//   });

// const updateUser = (req, res, next) => User.findByIdAndUpdate(req.user._id, { ...req.body },
//   {
//     new: true,
//     runValidators: true,
//   })
//   .then((user) => res.status(200).send(user))
//   .catch((e) => {
//     if (e.name === 'CastError') {
//       next(new BadRequest('Переданы некорректные данные'));
//     } next(e);
//   });

// module.exports = {
//   getUsers, getUserId, getCurrentUser, createUser, loginUser, updateAvatar, updateUser,
// };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET_DEV } = require('../configs');
const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request');
const Conflict = require('../errors/conflict-error');
const Unauthorized = require('../errors/unauthorized-error');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(e);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Токен не найден');
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(e);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Такой email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
        }))
        .catch(next);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(e);
    });
};

const loginUser = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверный пароль или email');
      }

      return bcrypt.compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неверный пароль или email');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      },  NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      return res.status(201).send({ token });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => User.findByIdAndUpdate(req.user._id, { ...req.body },
  {
    new: true,
    runValidators: true,
  })
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные'));
    } next(e);
  });

const updateUser = (req, res, next) => User.findByIdAndUpdate(req.user._id, { ...req.body },
  {
    new: true,
    runValidators: true,
  })
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные'));
    } next(e);
  });

module.exports = {
  getUsers, getUserId, getCurrentUser, createUser, loginUser, updateAvatar, updateUser,
};
