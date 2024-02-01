export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", handleEscapePress);

  popup.addEventListener("click", handleOverlayClick);

}

export function handleEscapePress(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscapePress);

  popup.removeEventListener("click", handleOverlayClick);

}
