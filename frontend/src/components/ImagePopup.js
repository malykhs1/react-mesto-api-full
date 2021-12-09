function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card && "popup_opened"}`}>
      <div className="popup__container popup__container_filling_image">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
        ></button>
        <img
          alt={card ? card.name : ""}
          src={card ? card.link : ""}
          className="popup__image"
        />
        <h2 className="popup__title popup__title_position_card">
          {card ? card.name : ""}
        </h2>
      </div>
    </section>
  );
}

export default ImagePopup;
