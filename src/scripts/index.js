import { createCard, likeCard, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./cards.js";

import "../pages/index.css";

export const cardsContainer = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template");
const popups = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const formEditProfile = document.querySelector("[name=edit-profile]");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const formAddCard = document.querySelector("[name=new-place]");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = formAddCard.querySelector(".popup__input_type_url");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

function showInitialCards() {
  initialCards.forEach((initialCards) => {
    const cardElement = createCard(initialCards, deleteCard, openImagePopup, likeCard);
    cardsContainer.append(cardElement);
  });
}

showInitialCards();

function getCurrentProfileData() {
  return {
    currentName: document.querySelector(".profile__title").textContent,
    currentJob: document.querySelector(".profile__description").textContent,
  };
}

popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

function editFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = nameValue;
  description.textContent = jobValue;
  closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardPlace = {};
  cardPlace.name = cardNameInput.value;
  cardPlace.link = cardUrlInput.value;
  const card = createCard(cardPlace, deleteCard, openImagePopup, likeCard);
  cardsContainer.prepend(card);
  closePopup(popupAdd);
  formAddCard.reset();
}

function openImagePopup(src, caption) {
  popupImage.src = src;
  popupImage.alt = caption;
  popupImageCaption.textContent = caption;
  openPopup(popupTypeImage);
}

editButton.addEventListener("click", () => {
  const { currentName, currentJob } = getCurrentProfileData();

  openPopup(popupEdit);
  nameInput.value = currentName;
  jobInput.value = currentJob;
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

formEditProfile.addEventListener("submit", editFormSubmit);

formAddCard.addEventListener("submit", handleCardFormSubmit);
