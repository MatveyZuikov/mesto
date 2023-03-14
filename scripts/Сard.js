import { openPhotoPopup } from "./index.js";

export class Card {
  constructor(initialCards, selector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
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

    const cardPhoto = this._card.querySelector(".photo-grid__photo");

    this._card.querySelector(".photo-grid__name").textContent = this._name;
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(".photo-grid__like")
      .addEventListener("click", () => {
        this._likeToggle();
      });
    this._card
      .querySelector(".photo-grid__bin")
      .addEventListener("click", this._removeCard);
    this._card
      .querySelector(".photo-grid__photo")
      .addEventListener("click", () => {
        openPhotoPopup(this._name, this._link);
      });
  }

  _likeToggle() {
    this._card
      .querySelector(".photo-grid__like")
      .classList.toggle("photo-grid__like_active");
  }

  _removeCard(evt) {
    const parentElement = evt.target.closest(".photo-grid__element");
    parentElement.remove();
  }
}

