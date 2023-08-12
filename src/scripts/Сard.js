export class Card {
  constructor({ data, handleCardClick, popupDeleteWork }, selector, userId) {
    this._data = data;
    this._place = this._data.place;
    this._name = this._data.name;
    this._link = this._data.link;
    this._handleCardClick = handleCardClick;
    this._popupDeleteWork = popupDeleteWork;
    this._selector = selector;
    this._userId = userId;
    this._owner = this._data.owner._id;
    this._cardId = this._data._id;
  }

  _getTempalte() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".photo-grid__element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTempalte();

    this._cardPhoto = this._card.querySelector(".photo-grid__photo");
    this._cardLikeBtn = this._card.querySelector(".photo-grid__like");
    this._cardAmount = this._card.querySelector(".photo-grid__like-amount");
    this._bin = this._card.querySelector(".photo-grid__bin");

    this._card.querySelector(".photo-grid__name").textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    if ("likes" in this._data) {
      this._cardAmount.textContent = this._data.likes.length;
    } else {
      this._cardAmount.textContent = 0;
    }
    if (this._userId != this._owner) {
      this._bin.remove();
    }

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () => {
      this._popupDeleteWork(this._cardId, this);
    });

    this._cardLikeBtn.addEventListener("click", () => {
      this._toggleLike();
    });
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  _toggleLike() {
    this._cardLikeBtn.classList.toggle("photo-grid__like_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
