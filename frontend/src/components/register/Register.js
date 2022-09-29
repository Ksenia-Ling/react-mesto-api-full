import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
    });

    function handleChange(evt) {
        const { value, name } = evt.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(registerData);
    }

    return (
        <div className="register">
            <h3 className="register__title">Регистрация</h3>
            <form
                className="register__form"
                onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="register__input"
                    name="email"
                    id="register-email-input"
                    placeholder="Email"
                    minLength="4"
                    maxLength="40"
                    value={registerData.email || ''}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="register__input"
                    name="password"
                    id="register-password-input"
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="240"
                    value={registerData.password || ''}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="register__submit-button">
                    Зарегистрироваться
                </button>
            </form>
            <Link to="/sign-in"
                className="register__link">
                Уже зарегистрированы? Войти
            </Link>
        </div>
    )
}

export default Register;