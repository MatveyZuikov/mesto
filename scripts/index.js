const addCardPopup = document.querySelector(".popup_type_add-card");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const fullPhotoPopup = document.querySelector('.popup_type_full-photo');
const editProfileBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_title_name");
const jobInput = document.querySelector(".popup__input_title_job");
const formElement = editProfilePopup.querySelector(".popup__form");
const cardsPlace = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.photo-grid__template').content.querySelector('.photo-grid__element');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

renderCards();

function renderCards() {


  initialCards.forEach((item) => {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__name').textContent = item.name;
    card.querySelector('.photo-grid__photo').src = item.link;
    card.querySelector('.photo-grid__photo').alt = item.name;
    cardsPlace.append(card);
    card.querySelector('.photo-grid__like').addEventListener('click', likeToggle);
    card.querySelector('.photo-grid__bin').addEventListener('click', removeCard);
    card.querySelector('.photo-grid__photo').addEventListener('click', () =>{
      fullPhotoPopup.querySelector('.popup__card-photo').src = card.querySelector('.photo-grid__photo').src;
      fullPhotoPopup.querySelector('.popup__card-photo').alt = card.querySelector('.photo-grid__photo').alt;
      fullPhotoPopup.querySelector('.popup__photo-title').textContent = item.name;
      openPopup(fullPhotoPopup);
    })
  })

  addCardPopup.querySelector('.popup__form').addEventListener('submit', (evt) =>{
    evt.preventDefault();
    const card = cardTemplate.cloneNode(true);
    const placeInput = document.querySelector('.popup__input_title_place');
    const linkInput = document.querySelector('.popup__input_title_link');
    const cardName = card.querySelector('.photo-grid__name');
    const cardPhoto = card.querySelector('.photo-grid__photo');
    cardName.textContent = placeInput.value;
    cardPhoto.alt = placeInput.value;
    cardPhoto.src = linkInput.value;

    cardsPlace.prepend(card);
    card.querySelector('.photo-grid__like').addEventListener('click', likeToggle);
    card.querySelector('.photo-grid__bin').addEventListener('click', removeCard);
    card.querySelector('.photo-grid__photo').addEventListener('click', () =>{
      fullPhotoPopup.querySelector('.popup__card-photo').src = card.querySelector('.photo-grid__photo').src;
      fullPhotoPopup.querySelector('.popup__card-photo').alt = card.querySelector('.photo-grid__photo').alt;
      fullPhotoPopup.querySelector('.popup__photo-title').textContent = placeInput.value;
      openPopup(fullPhotoPopup);
    })
    closePopup(addCardPopup);

  });
}

function removeCard(evt) {
  evt.target.parentElement.remove();
}

function likeToggle(evt) {
  evt.target.classList.toggle('photo-grid__like_active');
}


function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function closeCurrentPopup(currentPopup) {
  const closeBtn = currentPopup.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', () =>{
    closePopup(currentPopup);
  });

}

closeCurrentPopup(addCardPopup);
closeCurrentPopup(editProfilePopup);
closeCurrentPopup(fullPhotoPopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value ;
    profileJob.textContent = jobInput.value ;
    closePopup(editProfilePopup);

}

formElement.addEventListener('submit', handleFormSubmit);
addCardBtn.addEventListener('click', openAddCardPopup);
editProfileBtn.addEventListener('click', openEditProfilePopup);


