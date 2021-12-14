
function PopupAddPlaceContent () {
    return(
        <>
            <input className="popup__input" placeholder='Название' type="text" name="title" id="title" minLength="2"
                  maxLength="30" required />
               <span className="title-error"></span>
               <input className="popup__input" placeholder='Ссылка на картинку' type="url" name="link" id="link" required />
               <span className="link-error"></span>
        </>
    );
}

export default PopupAddPlaceContent;