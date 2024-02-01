import { cardTemplate } from "./index.js";

export function createCard(card, deleteCard, openImagePopup, likeCard) {
  const cardElement = cardTemplate.content
    .cloneNode(true)
    .querySelector(".places__item");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(card.link, card.name);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
