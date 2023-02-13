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
    popupFullPhoto.querySelector(".popup__card-photo").src = cardData.link;
    popupFullPhoto.querySelector(".popup__card-photo").alt = cardData.name;
    popupFullPhoto.querySelector(".popup__photo-title").textContent =
      cardData.name;
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

formEditProfilePopup.addEventListener("submit", handleEditProfileFormSubmit);
btnAddCard.addEventListener("click", openPopupAddCard);
btnEditProfile.addEventListener("click", openPopupEditProfile);
