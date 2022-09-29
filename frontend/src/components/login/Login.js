import { useState} from 'react';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!loginData.email || !loginData.password) {
            return
        }
        onLogin(loginData);
    }

    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>
            <form
                className="login__form"
                onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="login__input"
                    name="email"
                    id="login-email-input"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                    required />
                <input
                    type="password"
                    className="login__input"
                    name="password"
                    id="login-password-input"
                    placeholder="Пароль"
                    value={loginData.password}
                    onChange={handleChange}
                    required />
                <button
                    type="submit"
                    className="login__submit-button">Войти</button>
            </form>
        </div>
    )
}

export default Login;