export class FormValidator {
  constructor(config, currentPopup) {
    this._config = config;
    this._currentPopup = currentPopup;
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `.popup__input-error_title_${inputElement.name}`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__input-error_title_${inputElement.name}`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  };

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners(formElement) {
    this._inputList = Array.from(
      formElement.querySelectorAll(this._config.inputSelector)
    );

    const buttonElement = formElement.querySelector(
      this._config.submitButtonSelector
    );

    formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(this._inputList, buttonElement);
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);

        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formElement = this._currentPopup.querySelector(
      this._config.formSelector
    );

    this._setEventListeners(formElement);
  }
}
