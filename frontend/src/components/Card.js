import React from "react";
import deleteButton from "../images/delete-button.svg";
import likeButton from "../images/like.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

export const Card = ({ card, onCardClick, handleCardLike, handleCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const isOwn = card.owner === currentUser._id;


  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button" : "card__delete-button_hiden"
  }`;

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : "card__like"
  }`;

  const handleLikeClick = () => {
    handleCardLike(card);
  };

  const handleOpenCardClick = () => {
    onCardClick(card);
  };

  const handleClickDelete = () => {
    handleCardDelete(card);
  };

  return (
    <div className="card">
      <div className="card__photo-container">
        <img
          className="card__image"
          onClick={handleOpenCardClick}
          src={card.link}
          alt={card.name}
        />
        <img
          onClick={handleClickDelete}
          src={deleteButton}
          alt="Кнопка удаления карточки"
          className={cardDeleteButtonClassName}
        />
      </div>
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-place">
          <img
            onClick={handleLikeClick}
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
