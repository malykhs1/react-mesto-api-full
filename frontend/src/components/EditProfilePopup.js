import React from "react";
import { useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpened, onClose, onUpdateUser }) =>{
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpened]);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
}

  return (
    <PopupWithForm
      id={"form"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onClose={onClose}
      isOpened={isOpened}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        value={name || ''}
        type="text"
        name="name"
        id="name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="name-error" id="name-error"></span>
      <input
        className="popup__input"
        value={description || ''}
        type="text"
        name="job"
        id="job"
        minLength="2"
        maxLength="400"
        required
        onChange={handleChangeDescription}

      />
      <span className="job-error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
