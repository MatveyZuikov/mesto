import { initialCards, config } from "./constants.js";
import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

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
const formProfile = document.forms.profile;
const formPlace = document.forms.place;

export function openPhotoPopup(name, link) {
  popupCardPhoto.src = link;
  popupCardPhoto.alt = name;
  popupPhotoTitle.textContent = name;
  openPopup(popupFullPhoto);
}

function createOneCard(data) {
  const card = new Card(data, ".photo-grid__template");
  return card.createCard();
}

initialCards.forEach((cardData) => {
  cardsPlace.append(createOneCard(cardData));
});

const closePopupKeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");

    closePopup(currentPopup);
  }
};

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupKeyEscape);
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupKeyEscape);
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

  popup.addEventListener("mousedown", (evt) => {
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

  cardsPlace.prepend(createOneCard(cardInfo));
  closePopup(popupAddCard);
  evt.target.reset();
});

formEditProfilePopup.addEventListener("submit", handleEditProfileFormSubmit);
btnAddCard.addEventListener("click", openPopupAddCard);
btnEditProfile.addEventListener("click", openPopupEditProfile);

const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();
const cardAdderValidator = new FormValidator(config, formPlace);
cardAdderValidator.enableValidation();
