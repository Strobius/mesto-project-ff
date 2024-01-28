import { initialCards } from './cards.js';
import { createCard, showCards, likeCard, deleteCard } from './cards.js';
import { openPopup, closePopup, handleEscapePress, handleOverlayClick } from './modal.js';

import '../pages/index.css';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

showCards(initialCards, deleteCard, openImagePopup, likeCard);

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function openImagePopup(src, alt, caption) {
  popupImageImage.src = src;
  popupImageImage.alt = alt;
  popupImageCaption.textContent = caption;
  openPopup(popupImage);
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  const currentName = document.querySelector('.profile__title').textContent;
  const currentJob = document.querySelector('.profile__description').textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

const formEditProfile = document.querySelector("[name=edit-profile]");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const name = document.querySelector('.profile__title');
  const description = document.querySelector('.profile__description');
  name.textContent = nameValue;
  description.textContent = jobValue;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleFormSubmit);

const formAddCard = document.querySelector("[name=new-place]");
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formAddCard.querySelector('.popup__input_type_url');

document.addEventListener('click', function(event) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton) {
    likeCard(likeButton);
  }
});

function addCard(evt) {
  evt.preventDefault();
  const cardPlace = {};
  cardPlace.name = cardNameInput.value;
  cardPlace.link = cardUrlInput.value;
  const card = showCard(cardPlace, deleteCard);
  placesList.prepend(card);
  closePopup(popupAdd);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

formAddCard.addEventListener('submit', addCard);

const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

placesList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('card__image')) {
    const card = target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const src = cardImage.src;
    const alt = cardImage.alt;
    const caption = cardTitle.textContent;
    openImagePopup(src, alt, caption);
  }
});
