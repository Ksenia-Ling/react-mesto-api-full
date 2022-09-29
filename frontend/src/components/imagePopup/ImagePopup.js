function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_image-zoom ${isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
                <figure className="popup__image">
                    <img
                        className="popup__image-link"
                        src={card.link}
                        alt={card.name} />
                    <figcaption className="popup__image-caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )}

export default ImagePopup;