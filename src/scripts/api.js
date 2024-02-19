import { request } from "./utils.js"

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-6",
  headers: {
    authorization: 'c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347',
    'Content-Type': 'application/json',
  },
};

export const fetchUserData = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

export const fetchInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

export const updateProfileOnServer = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const newCardOnServer = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const deleteCardFromServer = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  });
};

export const updateAvatarS = (AvatarLink) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify({ avatar: AvatarLink }),
  });
};

export const toggleLikeCard = (cardId, isLiked) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      ...config.headers,
    },
  });
};

