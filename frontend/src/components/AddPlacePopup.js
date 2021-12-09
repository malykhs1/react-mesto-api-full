import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpened, onClose, onAddCard }) {
   const nameRef = React.useRef(); 
   const linkRef = React.useRef(); 

   function handleSubmit(e) {
      e.preventDefault();
      onAddCard({
        name: nameRef.current.value,
        link: linkRef.current.value,
      });
    } 



   return(
     <PopupWithForm
       id={"form"}
       title={"Новое место"}
       buttonText={"Создать"}
       onClose={onClose}
       isOpened={isOpened}
       onSubmit={handleSubmit}
     >
       <input
         className="popup__input"
         ref={nameRef}
         placeholder="Название"
         type="text"
         name="title"
         id="title"
         minLength="2"
         maxLength="30"
         required
       />
       <span className="title-error"></span>
       <input
         className="popup__input"
         ref={linkRef}
         placeholder="Ссылка на картинку"
         type="url"
         name="link"
         id="link"
         required
       />
       <span className="link-error"></span>
     </PopupWithForm>
   );
 }
 
 export default AddPlacePopup;
 