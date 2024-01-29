import { showCards, likeCard, deleteCard, } from './cards.js';
import { openPopup, closePopup, } from './modal.js';

import '../pages/index.css';

export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template');

showCards();

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

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
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

function editFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const name = document.querySelector('.profile__title');
  const description = document.querySelector('.profile__description');
  name.textContent = nameValue;
  description.textContent = jobValue;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', editFormSubmit);

const formAddCard = document.querySelector("[name=new-place]");
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formAddCard.querySelector('.popup__input_type_url');

placesList.addEventListener('click', function(event) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton) {
    likeCard(likeButton);
  }
});

function formAddCardSubmit(evt) {
  evt.preventDefault();
  const cardPlace = {};
  cardPlace.name = cardNameInput.value;
  cardPlace.link = cardUrlInput.value;
  const card = cardBody(cardPlace, deleteCard);
  placesList.prepend(card);
  closePopup(popupAdd);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

function cardBody({ name, link }, deleteCard) {
  const card = cardTemplate.content.cloneNode(true).querySelector('.places__item');
  const cardImg = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');

  cardImg.src = link;
  cardTitle.textContent = name;
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(card);
  });

  return card;
}

formAddCard.addEventListener('submit', formAddCardSubmit);

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
