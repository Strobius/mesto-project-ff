export function openPopup(popup) {
    popup.classList.add('popup_is-animated'); 
    setTimeout(() => {
      popup.classList.add('popup_is-opened'); 
    }, 0);
  
    document.addEventListener('keydown', handleEscapePress);
  
    popup.addEventListener('click', handleOverlayClick);
  
    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => {
      closePopup(popup);
    });
  }
  
  export function handleEscapePress(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_is-opened'));
    }
  }
  
  export function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  }
  
  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened'); 
    setTimeout(() => {
      popup.classList.remove('popup_is-animated'); 
    }, 600); 
  
    document.removeEventListener('keydown', handleEscapePress);
  
    popup.removeEventListener('click', handleOverlayClick);
  
    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.removeEventListener('click', () => {
      closePopup(popup);
    });
  }