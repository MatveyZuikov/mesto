import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._popupCardPhoto = this._popup.querySelector(".popup__card-photo");
    this._popupPhotoTitle = this._popup.querySelector(".popup__photo-title");
  }

  open(data) {
    super.open()
    this._popupCardPhoto.src = data.link;
    this._popupCardPhoto.alt = data.name;
    this._popupPhotoTitle.textContent = data.name;
  }
}
