import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../header/Header.js';
import Main from '../main/Main.js';
import Footer from '../footer/Footer.js';
import PopupWithForm from '../popupWithForm/PopupWithForm.js';
import ImagePopup from '../imagePopup/ImagePopup.js';
import EditProfilePopup from '../editProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../editAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../addPlacePopup/AddPlacePopup.js';
import { api } from '../../utils/Api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../protectedRoute/ProtectedRoute.js';
import Login from '../login/Login.js';
import Register from '../register/Register.js';
import InfoToolTip from '../infoToolTip/InfoToolTip.js';
import * as auth from '../../utils/Auth';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({ name: '', about: '' });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isToolTipPopupOpen, setisToolTipPopupOpen] = useState(false);
    const [email, setEmail] = useState('');

    const history = useHistory();


    useEffect(() => {
        if (isLoggedIn) {
            api
                .getUserInfo()
                .then(setCurrentUser)
                .catch(console.log)
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            api
                .getInitialCards()
                .then(setCards)
                .catch(console.log)
        }
    }, [isLoggedIn])

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            handleCheckToken();
        }
    }, []);

    function handleCheckToken() {
        auth
            .checkToken()
            .then((data) => {
                setEmail(data.email);
                setIsLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleRegister(info) {
        auth
            .register(info)
            .then(() => {
                setIsRegistered(true);
                setisToolTipPopupOpen(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err);
                setIsRegistered(false);
                setisToolTipPopupOpen(true);
            })
    }

    function handleLogin(info) {
        auth
            .authorize(info)
            .then((res) => {
                localStorage.setItem('loggedIn', 'true');
                setEmail(info.email);
                setIsLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setisToolTipPopupOpen(true);
            })
    }

    function handleLogOut() {
        setIsLoggedIn(false);
        localStorage.removeItem('loggedIn');
        history.push('/sign-in');
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(console.log);
    };

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(console.log);

    };

    function handleUpdateUser(userInfo) {
        api
            .editProfile(userInfo.name, userInfo.about)
            .then((newInfo) => {
                setCurrentUser(newInfo);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function handleUpdateAvatar(userAvatar) {
        api
            .editAvatar(userAvatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function handleAddPlaceSubmit(cardInfo) {
        api
            .addCard(cardInfo.name, cardInfo.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
        setisToolTipPopupOpen(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Header
                    loggedIn={isLoggedIn}
                    onLogOut={handleLogOut}
                    email={email} />
                <Switch>
                    <Route
                        path="/sign-up">
                        <Register
                            onRegister={handleRegister} />
                    </Route>
                    <Route
                        path="/sign-in">
                        <Login
                            onLogin={handleLogin} />
                    </Route>

                    <ProtectedRoute
                        exact path="/"
                        isLoggedIn={isLoggedIn}
                        component={Main}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />

                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    title="Вы уверены?"
                    name="delete-confirmation"
                    submitText="Да"
                    onClose={closeAllPopups}>

                    <div
                        className="popup__delete-container">
                        <button
                            type="submit"
                            className="popup__submit-button popup__submit-button_place_card">Да</button>
                    </div>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}>
                </ImagePopup>

                <InfoToolTip
                    isOpen={isToolTipPopupOpen}
                    onClose={closeAllPopups}
                    isCheckInSuccessful={isRegistered}
                    toolTipText={isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}>
                </InfoToolTip>

            </div>
        </CurrentUserContext.Provider>
    );

}

export default App;
