const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden-error');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } next(e);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Нет карточки по данному id')))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new Forbidden('Нет прав'));
      } else {
        Card.deleteOne(card)
          .then(() => res.send(card));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id карточки');
      } return res.status(200).send({ card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Невозможно поставить лайк. Переданы некорретные данные'));
      } next(e);
    });
};

const unlikeCard = (req, res, next) => Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий id карточки');
    } return res.status(200).send({ data: card });
  })
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new BadRequest('Невозможно удалить лайк. Переданы некорретные данные'));
    } next(e);
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
