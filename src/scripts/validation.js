function showError(form, input, errorMessage, validationConfig) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideError(form, input, validationConfig) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
}

function checkInputValidity(form, input, validationConfig) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }

    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, validationConfig);
    } else {
        hideError(form, input, validationConfig);
    }
}

function toggleButtonState(form, validationConfig) {
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
}

function setEventListeners(form, validationConfig) {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            checkInputValidity(form, input, validationConfig);
            toggleButtonState(form, validationConfig);
        });
    });
}

function enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector))
    forms.forEach((form) => {
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        setEventListeners(form, validationConfig);
    });
}

function clearValidation(form, validationConfig) {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach((input) => {
        hideError(form, input, validationConfig);
    });

    submitButton.disabled = true;
}

export { enableValidation, clearValidation };
  