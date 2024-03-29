 function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Ошибка: ${res.status}`);
  }
}

export function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
}
