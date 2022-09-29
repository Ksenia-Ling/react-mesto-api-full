import React from 'react';

function PopupWithForm({ isOpen, onClose, onSubmit, name, title, submitText, children }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
                <h3 className="popup__heading">{title}</h3>
                <form
                    className="popup__input-container"
                    name={name}
                    onSubmit={onSubmit}
                >

                    {children}

                    <button
                        type="submit"
                        className="popup__submit-button">{submitText}
                    </button>
                </form>
            </div>
        </div>
    )

}

export default PopupWithForm;