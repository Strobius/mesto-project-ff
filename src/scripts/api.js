export const fetchUserData = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-6/users/me", {
    headers: {
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ошибка при загрузке данных пользователя");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchInitialCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-6/cards", {
    headers: {
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ошибка при загрузке карточек");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateProfileOnServer = (name, about) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me", {
    method: "PATCH",
    headers: {
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ошибка при обновлении данных пользователя");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const newCardOnServer = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-6/cards", {
    method: "POST",
    headers: {
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ошибка при добавлении новой карточки");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при удалении карточки");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateAvatarS = (AvatarLink) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347",
    },
    body: JSON.stringify({ avatar: AvatarLink }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    });
};
