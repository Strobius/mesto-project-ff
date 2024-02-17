import { cardTemplate } from "./index.js";
import { deleteCardFromServer } from "./api.js"

export function createCard(card, deleteCard, openImagePopup, cardLike, currentUserID) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".places__item");
  
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountElement = cardElement.querySelector('.like-count');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  likeCountElement.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === currentUserID);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (currentUserID) {
    if (card.owner._id !== currentUserID) {
      deleteButton.remove(); 
    } 
  }

  cardImage.addEventListener("click", () => {
    openImagePopup(card.link, card.name);
  });

  likeButton.addEventListener("click", (evt) => {
    cardLike(evt, card._id, likeButton, likeCountElement, currentUserID);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, card._id);
  });

  return cardElement;
}

export function deleteCard(cardElement, cardId) {
  cardElement.remove();
  deleteCardFromServer(cardId);
}


export function cardLike(evt, cardId, likeButton, likesCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: 'c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347',
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedCardData) => {
      likesCounter.textContent = updatedCardData.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error("Ошибка при постановке лайка", error);
    });
}


