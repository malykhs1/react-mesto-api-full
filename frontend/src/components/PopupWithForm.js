import react from "react";

const PopupWithForm = ({
  id,
  title,
  children,
  isOpened,
  onClose,
  buttonText,
  onSubmit,
}) => {
  const closeByEsc = (e) => {
    if (e.key === "Escape") {
      onClose && onClose();
    }
  };
  react.useEffect(() => {
     document.addEventListener("keyup", closeByEsc);

    return () => {
      document.removeEventListener("keyup", closeByEsc);
    };
  }, [isOpened, onClose]);

  return (
    <section className={isOpened ? `popup_opened popup` : `popup`} id={id}>
      <div className={`popup__container popup__container_filling_${id}`}>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть попап"
        ></button>
        <h2 className="popup__title popup__title_position_form">{title}</h2>
        <form
          className="popup__form"
          name={`form-${id}`}
          id={`form-edit-${id}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save-button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
