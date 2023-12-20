// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(initialCards, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.places__item');

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCallback(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  const placesList = document.querySelector('.places__list');
  placesList.removeChild(cardElement);
}

function renderCards() {
  const placesList = document.querySelector('.places__list');
  
  initialCards.forEach(function(initialCards) {
    const cardElement = createCard(initialCards, deleteCard);
    placesList.appendChild(cardElement);
  });
}

renderCards();