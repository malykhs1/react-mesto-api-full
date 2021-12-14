
function PopupProfileContent () {
    return (
        <>
                <input className="popup__input" type="text" name="name" id="name" minLength="2" maxLength="40" required />
               <span className="name-error" id="name-error"></span>
               <input className="popup__input" type="text" name="job" id="job" minLength="2" maxLength="400" required />
               <span className="job-error" id="job-error"></span>
        </>
    )
}

export default PopupProfileContent