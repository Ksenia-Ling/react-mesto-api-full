import { useState, useEffect, useContext } from 'react';
import PopupWithForm from "../popupWithForm/PopupWithForm"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState({ name: '' });
    const [description, setDescription] = useState({ about: '' });
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile-edit"
            submitText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                type="text"
                className="popup__input popup__input_type_name"
                name="name-input"
                id="name-input"
                value={name}
                onChange={handleNameChange}
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40" />

            <span
                className="popup__input-error popup__input-error_place_up"
                id="name-input-error">
            </span>

            <input
                type="text"
                className="popup__input popup__input_type_job"
                name="job-input"
                id="job-input"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200" />

            <span
                className="popup__input-error popup__input-error_place_down"
                id="job-input-error">
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;