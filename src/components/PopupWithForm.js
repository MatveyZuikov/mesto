import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSumbit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._saveBtn = this._popup.querySelector(".popup__btn");
    this._text = this._saveBtn.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSumbit(this._getInputValues());
    });
  }

  da() {
    console.log(this._text);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._saveBtn.textContent = "Сохранение...";
    } else {
      this._saveBtn.textContent = this._text;
    }
  }
}
