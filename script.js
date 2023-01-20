let popup = document.querySelector(".popup")
let popupClosigBtn = document.querySelector(".popup__close-btn");
let editBtn = document.querySelector(".profile__edit-button");
let saveBtn = document.querySelector(".popup__btn")
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");
let formElement = document.querySelector(".popup__container");

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent ;
  jobInput.value = profileJob.textContent ;

}
function closePopup() {
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
popupClosigBtn.addEventListener('click', closePopup);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profileName.textContent = nameInput.value ;
    profileJob.textContent = jobInput.value ;
    closePopup();

}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

