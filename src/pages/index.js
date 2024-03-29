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
      .then((data) => {
        card.removeCard();
        popupConfirm.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeClick(id, likeStatus, card) {
  if (!likeStatus) {
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
  token: "0093586c-84ff-45bb-bc45-c3a1b052e50e",
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
  handleFormSubmit: (data) => {
    popupEditAvatar.renderSaving(true);
    api
      .changeUserAvatar(data.avatar)
      .then((data) => {
        userInfo.setAvatarPhoto(data.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupEditAvatar.renderSaving(false);
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
    popupNewCard.renderSaving(true);
    api
      .addNewCard({ name: data.place, link: data.link })
      .then((data) => {
        cardList.prependItem(createCard(data, data.owner._id));
        popupNewCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupNewCard.renderSaving(false);
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
    popupEdit.renderSaving(true);
    api
      .changeUserInfo({ name: data.name, about: data.job })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, job: data.about });
        popupEdit.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupEdit.renderSaving(false);
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
    const [user, cards] = data;

    userInfo.setUserInfo({
      name: user.name,
      job: user.about,
    });
    userInfo.setAvatarPhoto(user.avatar);
    cardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.error(err);
  });

// Promise.all([api.getUserInfo(), api.getInitialCards()])
//   .then((data) => {
//     userInfo.setUserInfo({
//       name: data[0].name,
//       job: data[0].about,
//     });
//     userInfo.setAvatarPhoto(data[0].avatar);
//     cardList.renderItems(data[1], data[0]._id);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
