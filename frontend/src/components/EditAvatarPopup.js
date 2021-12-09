import PopupWithForm from "./PopupWithForm";
import React from "react";
const EditAvatarPopup = ({ isOpened, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      id={"avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        id="avatar"
        minLength="2"
        required
      />
      <span className="job-error" id="job-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
