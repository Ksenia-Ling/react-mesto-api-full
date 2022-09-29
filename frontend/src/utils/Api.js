class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получение информации о пользователе
  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, { headers: this._headers, credentials: 'include' })
      .then(this._checkResponce)
  }

  // получение изначальных карточек 
  getInitialCards(jwt) {
    return fetch(`${this._url}/cards`, { headers: this._headers, credentials: 'include', })
      .then(this._checkResponce)
  }

  // метод редактирования профиля
  editProfile(userName, userAbout, jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._checkResponce)
  }

  // метод добавления карточки
  addCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._checkResponce)
  }

  // метод удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponce)
  }

  // метод редактирования аватара пользователя
  editAvatar(avatarInfo, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarInfo.avatar
      })
    })
      .then(this._checkResponce)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponce)
  }
}

export const api = new Api({
  url: 'https://api.mesto.ksenia-ling.nomoredomains.club',
  // url: 'http://api.mesto.ksenia-ling.nomorepartiesxyz.ru',
  // url: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

