import { initialCards, config } from "../utils/constants.js";
import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupConfirm } from "./PopupConfirm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";
import "../pages/index.css";
import { data } from "autoprefixer";

const popupAddCard = document.querySelector(".popup_type_add-card");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupFullPhoto = document.querySelector(".popup_type_full-photo");
const popupDeleteCard = document.querySelector(
  ".popup_type_deletion-confirmation"
);
const popupAvatar = document.querySelector(".popup_type_avatar-update");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profilePhoto = document.querySelector(".profile__avatar");
const cardsPlace = document.querySelector(".photo-grid");
const formProfile = document.forms.profile;
const formPlace = document.forms.place;
const avaratBtn = document.querySelector(".profile__avatar-btn");

const popupConfirm = new PopupConfirm(popupDeleteCard);
popupConfirm.setEventListeners();

function popupDeleteWork(cardId, card) {
  popupConfirm.open();
  popupConfirm.confirmProcess(() => {
    api
      .deleteCard(cardId)
      .then(card.removeCard())
      .catch((err) => {
        console.error(err);
      });
  });
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-72",
});

const cardList = new Section(
  {
    renderer: (item, id) => {
      const card = createCard(item, id);
      cardList.addItem(card);
    },
  },
  cardsPlace
);

const createCard = (item, id) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (data) => {
        popupWithImage.open(data);
      },
      popupDeleteWork,
    },
    ".photo-grid__template",
    id
  );
  const cardElement = card.createCard();

  return cardElement;
};

// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = createCard(item);
//       cardList.addItem(card);
//     },
//   },
//   cardsPlace
// );

// cardList.renderItems();

const popupWithImage = new PopupWithImage(popupFullPhoto);
popupWithImage.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {},
});

const popupNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    const card = createCard({ name: data.place, link: data.link });
    api
      .addNewCard({ name: data.place, link: data.link })
      .then((data) => {
        cardList.prependItem(card);
      })
      .catch((err) => {
        console.error(err);
      });
  },
});
popupNewCard.setEventListeners();

btnAddCard.addEventListener("click", () => {
  popupNewCard.open();
});

const userInfo = new UserInfo(profileName, profileJob, profilePhoto);

const popupEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.job });
    api.changeUserInfo({ name: data.name, about: data.job }).catch((err) => {
      console.error(err);
    });
  },
});
popupEdit.setEventListeners();

btnEditProfile.addEventListener("click", () => {
  popupEdit.open();
  const infoObject = userInfo.getUserInfo();
  popupEdit.setInputValues(infoObject);
});

const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();
const cardAdderValidator = new FormValidator(config, formPlace);
cardAdderValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()]).then((data) => {
  userInfo.setUserInfo({
    name: data[0].name,
    job: data[0].about,
  });
  userInfo.setAvatarPhoto(data[0].avatar);
  console.log(data[1]);

  cardList.renderItems(data[1], data[0]._id);
});

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
