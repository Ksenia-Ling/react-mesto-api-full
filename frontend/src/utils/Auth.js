// export const BASE_URL = 'http://localhost:4000';
// export const BASE_URL = 'http://api.mesto.ksenia-ling.nomoredomains.club'
export const BASE_URL = 'https://api.mesto.ksenia-ling.nomoredomains.club'


const checkResponce = (response) =>
    response.ok
        ? response.json()
        : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));

const headers = {
    'Content-Type': 'application/json',
}

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: data.email, password: data.password })
    })
        .then(res => checkResponce(res))
};

export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ email: data.email, password: data.password})
    })
        .then(res => checkResponce(res))
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers,
        credentials: 'include',
    })
        .then(res => checkResponce(res))
};


