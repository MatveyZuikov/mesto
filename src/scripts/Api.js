

export class Api {
  constructor({ url }) {
    this._url = url;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  deleteCard ({id}){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
      },
    })
  }

  // likeCard ({id} ) {

  // }


}
