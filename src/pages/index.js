import { initialCards, config } from "../utils/constants.js";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
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
const formAvatar = document.forms.avatar;
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

function handleLikeClick(id, isLiked, card) {
  if (!isLiked) {
    api
      .likeCard(id)
      .then((data) => {
        card.setLikeNumber(data.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeCard(id)
      .then((data) => {
        card.setLikeNumber(data.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
      handleLikeClick,
    },
    ".photo-grid__template",
    id
  );
  const cardElement = card.createCard();

  return cardElement;
};

const popupWithImage = new PopupWithImage(popupFullPhoto);
popupWithImage.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (avatar) => {
    api
      .changeUserAvatar(avatar)
      .then((avatar) => {
        userInfo.setAvatarPhoto(avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  },
});
popupEditAvatar.setEventListeners();

avaratBtn.addEventListener("click", () => {
  popupEditAvatar.open();
});

const popupNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    const card = createCard({ name: data.place, link: data.link });
    api
      .addNewCard({ name: data.place, link: data.link })
      .then((data) => {
        cardList.prependItem(createCard(card));
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
const avatarValidator = new FormValidator(config, formAvatar);
avatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((data) => {
    userInfo.setUserInfo({
      name: data[0].name,
      job: data[0].about,
    });
    userInfo.setAvatarPhoto(data[0].avatar);

    cardList.renderItems(data[1], data[0]._id);
  })
  .catch((err) => {
    console.error(err);
  });
