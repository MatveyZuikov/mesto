export class Card {
  constructor(
    { data, handleCardClick, popupDeleteWork, handleLikeClick },
    selector,
    userId
  ) {
    this._data = data;
    this._place = this._data.place;
    this._name = this._data.name;
    this._link = this._data.link;
    this._handleCardClick = handleCardClick;
    this._popupDeleteWork = popupDeleteWork;
    this._handleLikeClick = handleLikeClick;
    this._selector = selector;
    this._userId = userId;
    this._owner = data.owner._id;
    this._cardId = this._data._id;
    this._likes = this._data.likes;
    // this._isLiked = this._likes.some((like) => {
    //   return userId === like._id;
    // });
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
    if (this._userId != this._owner) {
      this._bin.remove();
    }

    // if (this._isLiked) {
    //   this._cardLikeBtn.classList.add("photo-grid__like_active");
    // }

    // this._cardAmount.textContent = this._likes.length;

    this.setLikeNumber(this._likes);

    this._setEventListeners();

    return this._card;
  }

  checkLikeStatus() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  setLikeNumber(likes) {
    this._cardAmount.textContent = likes.length;
    this._likes = likes;
    if (this.checkLikeStatus()) {
      this.likeCard();
    } else {
      this.dislikeCard();
    }
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () => {
      this._popupDeleteWork(this._cardId, this);
    });

    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, this.checkLikeStatus(), this);
    });
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  likeCard() {
    this._cardLikeBtn.classList.add("photo-grid__like_active");
  }

  dislikeCard() {
    this._cardLikeBtn.classList.remove("photo-grid__like_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
