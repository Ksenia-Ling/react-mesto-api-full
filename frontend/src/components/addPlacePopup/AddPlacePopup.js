import { useState, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handlePlaceNameChange(evt) {
        setName(evt.target.value);
    }

    function handlePlaceLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="new-place"
            submitText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                type="text"
                className="popup__input popup__input_type_title"
                name="title-input"
                id="title-input"
                value={name}
                onChange={handlePlaceNameChange}
                placeholder="Название"
                required
                minLength="2"
                maxLength="30" />

            <span
                className="popup__input-error popup__input-error_place_up"
                id="title-input-error">
            </span>

            <input
                type="url"
                className="popup__input popup__input_type_link"
                name="link-input"
                id="link-input"
                value={link}
                onChange={handlePlaceLinkChange}
                placeholder="Ссылка на картинку"
                required />

            <span
                className="popup__input-error popup__input-error_place_down"
                id="link-input-error">
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;