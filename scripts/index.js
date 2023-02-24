const popupAddCard = document.querySelector(".popup_type_add-card");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupFullPhoto = document.querySelector(".popup_type_full-photo");
const popups = Array.from(document.querySelectorAll(".popup"));
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_title_name");
const jobInput = document.querySelector(".popup__input_title_job");
const placeInput = document.querySelector(".popup__input_title_place");
const linkInput = document.querySelector(".popup__input_title_link");
const popupCardPhoto = popupFullPhoto.querySelector(".popup__card-photo");
const popupPhotoTitle = popupFullPhoto.querySelector(".popup__photo-title");
const formEditProfilePopup = popupEditProfile.querySelector(".popup__form");
const cardsPlace = document.querySelector(".photo-grid");
const cardTemplate = document
  .querySelector(".photo-grid__template")
  .content.querySelector(".photo-grid__element");

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector(".photo-grid__name");
  const cardPhoto = card.querySelector(".photo-grid__photo");

  cardName.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;

  card.querySelector(".photo-grid__like").addEventListener("click", likeToggle);
  card.querySelector(".photo-grid__bin").addEventListener("click", removeCard);
  cardPhoto.addEventListener("click", () => {
    popupCardPhoto.src = cardData.link;
    popupCardPhoto.alt = cardData.name;
    popupPhotoTitle.textContent = cardData.name;
    openPopup(popupFullPhoto);
  });

  return card;
}

function renderDfltCards(defaultCards) {
  const cards = defaultCards.map((card) => {
    return createCard(card);
  });

  cardsPlace.append(...cards);
}

renderDfltCards(initialCards);

function removeCard(evt) {
  const parentElement = evt.target.closest(".photo-grid__element");
  parentElement.remove();
}

function likeToggle(evt) {
  evt.target.classList.toggle("photo-grid__like_active");
}

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function openPopupAddCard() {
  openPopup(popupAddCard);
}

popups.forEach((popup) => {
  popup.querySelector(".popup__close-btn").addEventListener("click", () => {
    closePopup(popup);
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });

  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) closePopup(popup);
  });
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

popupAddCard.querySelector(".popup__form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardInfo = { name: placeInput.value, link: linkInput.value };

  const card = createCard(cardInfo);

  cardsPlace.prepend(card);
  closePopup(popupAddCard);
  evt.target.reset();
});

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

formEditProfilePopup.addEventListener("submit", handleEditProfileFormSubmit);
btnAddCard.addEventListener("click", openPopupAddCard);
btnEditProfile.addEventListener("click", openPopupEditProfile);
