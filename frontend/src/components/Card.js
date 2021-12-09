import React from "react";
import deleteButton from "../images/delete-button.svg";
import likeButton from "../images/like.svg";
import CurrentUserContext from "../context/CurrentUserContext";

const Card = ({ card, onCardClick, handleCardLike, handleCardDelete }) => {
  const user = React.useContext(CurrentUserContext);

  const isOwn = card.owner === user._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button" : "card__delete-button_hiden"
  }`;

  const isLiked = card.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : "card__like"
  }`;

  return (
    <div className="card">
      <div className="card__photo-container">
        <img
          className="card__image"
          onClick={(_) => onCardClick(card)}
          src={card.link}
          alt={card.name}
        />
        <img
          onClick={(_) => handleCardDelete(card)}
          src={deleteButton}
          alt="Кнопка удаления карточки"
          className={cardDeleteButtonClassName}
        />
      </div>
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-place">
          <img
            onClick={(_) => handleCardLike(card)}
            src={likeButton}
            alt="Кнопка лайка"
            className={cardLikeButtonClassName}
          />
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
