import { useRef, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar-edit"
            isOpen={isOpen}
            submitText="Сохранить"
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                type="url"
                className="popup__input popup__input_type_avatar-link"
                name="avatar-link-input"
                id="avatar-link-input"
                ref={avatarRef}
                placeholder="Ссылка на картинку"
                required />

            <span
                className="popup__input-error popup__input-error_place_up"
                id="avatar-link-input-error">
            </span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;