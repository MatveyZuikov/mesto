import { openPhotoPopup } from "./index.js";

export class Card {
  constructor(cardData, selector) {
    this._name = cardData.name;
    this._link = cardData.link;
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

    this._card.querySelector(".photo-grid__name").textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._toggleLike();
    });
    this._card
      .querySelector(".photo-grid__bin")
      .addEventListener("click", this._removeCard);
    this._cardPhoto.addEventListener("click", () => {
      openPhotoPopup(this._name, this._link);
    });
  }

  _toggleLike() {
    this._cardLikeBtn.classList.toggle("photo-grid__like_active");
  }

  _removeCard(evt) {
    const parentElement = evt.target.closest(".photo-grid__element");
    parentElement.remove();
  }
}
