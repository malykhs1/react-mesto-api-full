import Card from "./Card";
import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const initialCards = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      handleCardDelete={onCardDelete}
      handleCardLike={onCardLike}
    />
  ));

  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-place">
          <img
            src={userInfo.avatar}
            alt="Фото пользователя"
            className="profile__avatar"
          />
          <button
            type="button"
            onClick={handleEditAvatarClick}
            className="profile__avatar-button"
            id="avatar-button"
            aria-label="Загрузить контент"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button
              type="button"
              onClick={handleEditProfileClick}
              className="profile__edit-button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__job">{userInfo.about}</p>
        </div>
        <button
          type="button"
          onClick={handleAddPlaceClick}
          className="profile__add-button"
          aria-label="Загрузить контент"
        ></button>
      </section>
      <section className="elements section">{initialCards}</section>
    </main>
  );
}

export default Main;
