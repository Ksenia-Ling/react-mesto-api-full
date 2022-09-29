import React, { useState } from 'react';
import logo from '../../images/header/logo.svg';
import { NavLink, Route, Switch } from 'react-router-dom';

function Header({ loggedIn, onLogOut, email }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleLogout() {
        setIsMenuOpen(false);
        onLogOut();
    }

    return (
            <header className="header">
                <img
                    className="header__logo"
                    src={logo}
                    alt="лого 'Mesto Russia'" />
                <Switch>
                    <Route path="/sign-in">
                        <div className={`header__container ${!loggedIn && "header__container_logout"}`}>
                            <nav>
                                <NavLink to="/sign-up" className="header__link">
                                    Регистрация
                                </NavLink>
                            </nav>
                        </div>
                    </Route>
                    <Route path="/sign-up">
                        <div className={`header__container ${!loggedIn && "header__container_logout"}`}>
                            <nav>
                                <NavLink to="/sign-in" className="header__link">
                                    Войти
                                </NavLink>
                            </nav>
                        </div>
                    </Route>
                    <Route exact path="/">
                        <div className={!isMenuOpen ? "header__container" : "header__container header__container_opened"}>
                            <p className="header__email">
                                {email}
                            </p>
                            <button
                                className="button header__logout-button"
                                onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    </Route>
                </Switch>
            </header>
    );
}

export default Header;
