import { deleteCardFromServer, toggleLikeCard } from "./api.js"

const cardTemplate = document.querySelector("#card-template");

export function createCard(card, deleteCard, openImagePopup, likeCard, currentUserID) {
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
    likeCard(evt, card._id, likeButton, likeCountElement, currentUserID);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement, card._id);
  });

  return cardElement;
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}


export function likeCard(evt, cardId, likeButton, likesCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  toggleLikeCard(cardId, isLiked)
    .then((updatedCardData) => {
      likesCounter.textContent = updatedCardData.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error("Ошибка при постановке/снятии лайка", error);
    });
}

