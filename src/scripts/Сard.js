import { PopupConfirm } from "./PopupConfirm";
import { popupDeleteCard } from "./index.js";
export class Card {
  constructor({ data, handleCardClick }, selector, userId) {
    this._data = data;
    this._place = this._data.place;
    this._name = this._data.name;
    this._link = this._data.link;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
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
    if (this._data.owner._id != "02a3616c287d0a23f26e4f9f") {
      this._card.querySelector(".photo-grid__bin").remove();
    }

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    const Popup = new PopupConfirm(popupDeleteCard);

    if (this._card.querySelector(".photo-grid__bin") !== null) {
    }

    this._bin.addEventListener("click", () => {
      Popup.open();
      Popup.setEventListeners(this._removeCard);
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

  _removeCard() {
    this._card.remove();
    this._card = null;
  }
}
