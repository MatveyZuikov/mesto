import { initialCards, config } from "./constants.js";
import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import "../pages/index.css";

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
const formEditProfilePopup = popupEditProfile.querySelector(".popup__form");
const cardsPlace = document.querySelector(".photo-grid");
const formProfile = document.forms.profile;
const formPlace = document.forms.place;

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (data) => {
        popupWithImage.open(data);
      },
    },
    ".photo-grid__template"
  );
  const cardElement = card.createCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  cardsPlace
);

cardList.renderItems();

const popupWithImage = new PopupWithImage(popupFullPhoto);
popupWithImage.setEventListeners();

const popupNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    const card = createCard(data);
    cardsPlace.prepend(card);
  },
});
popupNewCard.setEventListeners();

btnAddCard.addEventListener("click", () => {
  popupNewCard.open();
});

const userInfo = new UserInfo(profileName, profileJob);
const userInputinfo = userInfo.getUserInfo();

const popupEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupEdit.setEventListeners();

btnEditProfile.addEventListener("click", () => {
  popupEdit.open();
  nameInput.value = userInputinfo.name;
  jobInput.value = userInputinfo.job;
});

const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();
const cardAdderValidator = new FormValidator(config, formPlace);
cardAdderValidator.enableValidation();


//старые наработки

// function handleEditProfileFormSubmit(evt) {
//   evt.preventDefault();
// profileName.textContent = nameInput.value;
// profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// }

// popupAddCard.querySelector(".popup__form").addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const cardInfo = { name: placeInput.value, link: linkInput.value };

//   cardsPlace.prepend(createOneCard(cardInfo));
//   closePopup(popupAddCard);
//   evt.target.reset();
// });

// formEditProfilePopup.addEventListener("submit", handleEditProfileFormSubmit);
// btnAddCard.addEventListener("click", openPopupAddCard);
// btnEditProfile.addEventListener("click", openPopupEditProfile);
