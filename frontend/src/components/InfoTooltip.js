import react from "react";

function InfoToolTip({ id, isOpened, onClose, isSuccseed }) {
  function closeByEsc(e) {
    if (e.key === "Escape") {
      onClose && onClose();
    }
  }

  react.useEffect(() => {
    document.addEventListener("keyup", closeByEsc);

    return () => {
      document.removeEventListener("keyup", closeByEsc);
    };
  }, [isOpened, onClose]);

  function changeTipText() {
    let text;
    if (isSuccseed === true) {
      text = "Вы успешно зарегистрировались";
    }
    if (isSuccseed === false) {
      text = "Что-то пошло не так. Попробуйте еще раз";
    }
    return text;
  }

  return (
    <div className={isOpened ? `popup_opened popup` : `popup`} id={id}>
      <div className={`popup__container popup__container_filling_${id}`}>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть попап"
        ></button>
        <div
          className={
            isSuccseed ? `popup__reg-image-ok` : `popup__reg-image-error`
          }
        ></div>
        <h3 className="popup__title popup__title_position_tips">
          {changeTipText()}
        </h3>
      </div>
    </div>
  );
}

export default InfoToolTip;
