import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  confirmProcess(deleteFunction) {
    this._deleteFunction = deleteFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteFunction()
    });
  }
}
