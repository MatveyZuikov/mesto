import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
  }

  open(data) {
    super.open()
    const popupCardPhoto = this._popup.querySelector(".popup__card-photo");
    const popupPhotoTitle = this._popup.querySelector(".popup__photo-title");
    popupCardPhoto.src = data.link;
    popupCardPhoto.alt = data.name;
    popupPhotoTitle.textContent = data.name;
  }
}
