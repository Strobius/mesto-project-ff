// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

function createCard(initialCards, deleteCard) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.places__item');

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = initialCards.link;
  cardTitle.textContent = initialCards.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  placesList.removeChild(cardElement);
}

function showCards() {
  
  initialCards.forEach( initialCards => {
    const cardElement = createCard(initialCards, deleteCard);
    placesList.appendChild(cardElement);
  });
}

showCards();