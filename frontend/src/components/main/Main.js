import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Card from '../card/Card.js';

function Main({ cards, onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">

                <div className="profile__avatar-container">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="аватар пользователя" />
                    <button
                        className="profile__avatar-overlay"
                        onClick={onEditAvatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__user-edit">
                        <div className="profile__user-data">
                            <h1 className="profile__heading">{currentUser.name}</h1>
                            <p className="profile__subheading">{currentUser.about}</p>
                        </div>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="Кнопка редактирования профиля"
                            onClick={onEditProfile} />
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        aria-label="Кнопка добавления карточек"
                        onClick={onAddPlace} />
                </div>
            </section>

            <section className="elements">
                <ul className="cards">
                    {cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete} />
                        )
                    })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;
