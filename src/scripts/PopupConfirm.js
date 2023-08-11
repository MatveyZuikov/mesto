import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners(deleteCardFuntion) {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      deleteCardFuntion();
      this.close();
    });
  }
}
