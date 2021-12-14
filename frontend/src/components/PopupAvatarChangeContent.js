
function PopupAvatarChangeContent () {
    return(
        <>
             <input className="popup__input" placeholder='Ссылка на картинку' type="url" name="avatar" id="avatar"
                  required />
               <span className="avatar-error"></span>
        </>
    );
}

export default PopupAvatarChangeContent;