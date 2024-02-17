(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{O:()=>m});function t(e,t,n,o,r){var c=m.content.cloneNode(!0).querySelector(".places__item"),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__like-button"),l=c.querySelector(".card__delete-button"),p=c.querySelector(".like-count");return a.src=e.link,a.alt=e.name,i.textContent=e.name,p.textContent=e.likes.length,e.likes.some((function(e){return e._id===r}))&&u.classList.add("card__like-button_is-active"),r&&e.owner._id!==r&&l.remove(),a.addEventListener("click",(function(){n(e.link,e.name)})),u.addEventListener("click",(function(t){o(t,e._id,u,p,r)})),l.addEventListener("click",(function(){t(c,e._id)})),c}function n(e,t){e.remove(),function(e){fetch("https://nomoreparties.co/v1/wff-cohort-6/cards/".concat(e),{method:"DELETE",headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347"}}).then((function(e){if(!e.ok)throw new Error("Ошибка при удалении карточки")})).catch((function(e){console.error(e)}))}(t)}function o(e,t,n,o){var r=n.classList.contains("card__like-button_is-active");fetch("https://nomoreparties.co/v1/wff-cohort-6/cards/likes/".concat(t),{method:r?"DELETE":"PUT",headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347","Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(e){o.textContent=e.likes.length,n.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при постановке лайка",e)}))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("click",a)}function c(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function a(e){e.target.classList.contains("popup")&&i(e.target)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("click",a)}function u(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.textContent=""}function l(e,t){var n=e.querySelectorAll(t.inputSelector),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),o.disabled=!0}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var s,d,f=document.querySelector(".places__list"),m=document.querySelector("#card-template"),_=document.querySelectorAll(".popup"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_avatar"),b=document.querySelector(".popup_type_image"),S=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__edit-button"),k=document.querySelector(".avatar_button"),E=document.querySelector(".avatar-save_button"),w=document.querySelector(".edit-save_button"),C=document.querySelector(".add-save_button"),g=document.querySelector("[name=edit-profile]"),L=g.querySelector(".popup__input_type_name"),x=g.querySelector(".popup__input_type_description"),j=document.querySelector("[name=new-place]"),A=j.querySelector(".popup__input_type_card-name"),O=j.querySelector(".popup__input_type_url"),T=document.querySelector("[name=avatar]"),z=T.querySelector(".popup__input_type_avatar"),P=b.querySelector(".popup__image"),B=b.querySelector(".popup__caption"),D=document.querySelector(".profile__title"),N=document.querySelector(".profile__description"),I=document.querySelector(".profile__image");function J(e,t){P.src=e,P.alt=t,B.textContent=t,r(b)}Promise.all([fetch("https://mesto.nomoreparties.co/v1/wff-cohort-6/users/me",{headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347"}}).then((function(e){if(e.ok)return e.json();throw new Error("Ошибка при загрузке данных пользователя")})).catch((function(e){console.error(e)})),fetch("https://mesto.nomoreparties.co/v1/wff-cohort-6/cards",{headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347"}}).then((function(e){if(e.ok)return e.json();throw new Error("Ошибка при загрузке карточек")})).catch((function(e){console.error(e)}))]).then((function(e){var r,c,a=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(r,c)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];i&&(D.textContent=i.name,N.textContent=i.about,I.style.backgroundImage="url(".concat(i.avatar,")"),s=i._id,u&&u.forEach((function(e){var r=t(e,n,J,o,s);f.append(r)})))})).catch((function(e){console.error(e)})),k.addEventListener("click",(function(){r(v),E.textContent="Сохранить",l(v,{inputSelector:".popup__input",submitButtonSelector:".popup__button"})})),q.addEventListener("click",(function(){var e={currentName:D.textContent,currentJob:N.textContent},t=e.currentName,n=e.currentJob;r(y),w.textContent="Сохранить",L.value=t,x.value=n,l(g,{inputSelector:".popup__input",submitButtonSelector:".popup__button"})})),_.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){i(e)}))})),S.addEventListener("click",(function(){r(h),C.textContent="Сохранить",l(h,{inputSelector:".popup__input",submitButtonSelector:".popup__button"})})),g.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=L.value,r=x.value;D.textContent=o,N.textContent=r,w.textContent="Сохранение...",t=o,n=r,fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me",{method:"PATCH",headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347","Content-Type":"application/json"},body:JSON.stringify({name:t,about:n})}).then((function(e){if(e.ok)return e.json();throw new Error("Ошибка при обновлении данных пользователя")})).catch((function(e){console.error(e)})),i(y)})),j.addEventListener("submit",(function(e){e.preventDefault();var r,c,a={};a.name=A.value,a.link=O.value,C.textContent="Сохранение...",(r=a.name,c=a.link,fetch("https://nomoreparties.co/v1/wff-cohort-6/cards",{method:"POST",headers:{authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347","Content-Type":"application/json"},body:JSON.stringify({name:r,link:c})}).then((function(e){if(e.ok)return e.json();throw new Error("Ошибка при добавлении новой карточки")})).catch((function(e){console.error(e)}))).then((function(e){var r=t({_id:e._id,name:e.name,link:e.link,likes:e.likes,owner:e.owner},n,J,o);f.prepend(r),i(h),j.reset()}))})),T.addEventListener("submit",(function(e){e.preventDefault();var t,n=z.value;E.textContent="Сохранение...",t=n,fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json",authorization:"c1ae719a-bbf9-4c5e-bd23-4cebcf5fa347"},body:JSON.stringify({avatar:t})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status))})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})),I.style.backgroundImage="url(".concat(n,")"),i(v),T.reset()})),d={formSelector:".popup__form",inputSelector:".popup__input",inputErrorSelector:".input_error",submitButtonSelector:".popup__button",inputErrorClass:".input_error"},Array.from(document.querySelectorAll(d.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,n,t),function(e,t){var n=e.querySelector(t.submitButtonSelector),o=e.checkValidity();n.disabled=!o}(e,t)}))}))}(e,d)}))})();