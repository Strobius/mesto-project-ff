import { createCard, cardLike, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  fetchUserData,
  fetchInitialCards,
  updateProfileOnServer,
  newCardOnServer,
  updateAvatarS,
} from "./api.js";

import "../pages/index.css";

// Карточки 
export const cardsContainer = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template");

// Попапы 
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupTypeImage = document.querySelector(".popup_type_image");

// Кнопки
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".avatar_button");
const avatarSaveButton = document.querySelector(".avatar-save_button");
const editSaveButton = document.querySelector(".edit-save_button");
const addSaveButton = document.querySelector(".add-save_button");

// Формы и инпуты 
const formEditProfile = document.querySelector("[name=edit-profile]");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const formAddCard = document.querySelector("[name=new-place]");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = formAddCard.querySelector(".popup__input_type_url");
const formAvatar = document.querySelector("[name=avatar]");
const avatarUrlInput = formAvatar.querySelector(".popup__input_type_avatar");

// Попап карточки
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

// Элементы профиля 
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

let currentUserID; 

Promise.all([fetchUserData(), fetchInitialCards()])
  .then(([userData, initialCardsData]) => {
    if (userData) {
      name.textContent = userData.name;
      description.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      currentUserID = userData._id;

      if (initialCardsData) {
        initialCardsData.forEach((card) => {
          const cardElement = createCard(
            card,
            deleteCard,
            openImagePopup,
            cardLike,
            currentUserID 
          );
          cardsContainer.append(cardElement);
        });
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

function getCurrentProfileData() {
  return {
    currentName: name.textContent,
    currentJob: description.textContent,
  };
}

function updateAvatar(event) {
  event.preventDefault();
  const avatarLink = avatarUrlInput.value;
  avatarSaveButton.textContent = "Сохранение...";
  updateAvatarS(avatarLink);
  profileImage.style.backgroundImage = `url(${avatarLink})`;
  closePopup(popupAvatar);
  formAvatar.reset();
}

function editFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = nameValue;
  description.textContent = jobValue;
  editSaveButton.textContent = "Сохранение...";
  updateProfileOnServer(nameValue, jobValue);
  closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardPlace = {};
  cardPlace.name = cardNameInput.value;
  cardPlace.link = cardUrlInput.value;
  addSaveButton.textContent = "Сохранение...";
  newCardOnServer(cardPlace.name, cardPlace.link).then((data) => {
    const card = {
      _id: data._id,
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner,
    };
    const cardElement = createCard(card, deleteCard, openImagePopup, cardLike);
    cardsContainer.prepend(cardElement);
    closePopup(popupAdd);
    formAddCard.reset();
  });
}

function openImagePopup(src, caption) {
  popupImage.src = src;
  popupImage.alt = caption;
  popupImageCaption.textContent = caption;
  openPopup(popupTypeImage);
}

avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
  avatarSaveButton.textContent = "Сохранить";
  clearValidation(popupAvatar, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
  })
});

editButton.addEventListener("click", () => {
  const { currentName, currentJob } = getCurrentProfileData();

  openPopup(popupEdit);
  editSaveButton.textContent = "Сохранить";
  nameInput.value = currentName;
  jobInput.value = currentJob;
  clearValidation(formEditProfile, validationConfig)
});

popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
  addSaveButton.textContent = "Сохранить";
  clearValidation(popupAdd, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
  });
});

formEditProfile.addEventListener("submit", editFormSubmit);

formAddCard.addEventListener("submit", handleCardFormSubmit);

formAvatar.addEventListener("submit", updateAvatar);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorSelector: ".input_error",
  submitButtonSelector: ".popup__button",
  inputErrorClass: ".input_error",
});
