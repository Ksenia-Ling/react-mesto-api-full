import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const cardRemoveVisibility = { visibility: isOwn ? 'visible' : 'hidden' };

    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonclassName = (
        `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="cards__element">
            <img
                className="cards__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <button
                className="cards__remove-button"
                type="button"
                style={cardRemoveVisibility}
                onClick={handleDeleteClick}>
            </button>
            <div className="cards__description">
                <h2 className="cards__heading">{card.name}</h2>
                <div className="cards__likes-container">
                    <button
                        className={cardLikeButtonclassName}
                        type="button"
                        onClick={handleLikeClick}>
                    </button>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
