export class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  _getResponseData = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }
}
