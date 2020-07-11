import { strings } from './config/index';
import { getEmailsFromInput, checkEmail } from './utils/index';

function EmailsInput(el) {
    const container = el;

    const wrapper = document.createElement('DIV');
    const emailsList = document.createElement('UL');
    const emailInput = document.createElement('INPUT');
    emailInput.placeholder = strings.PLACEHOLDER;

    function addNewEmail(textInput) {
        const possibleEmails = getEmailsFromInput(textInput);

        if (possibleEmails) {
            possibleEmails.forEach((item) => {
                const newEmail = document.createElement('LI');
                const closeButton = document.createElement('BUTTON');
                closeButton.type = 'button';
                closeButton.innerText = 'Remove';

                newEmail.innerText = item;
                if (!checkEmail(item)) {
                    newEmail.classList.add('wrong-email');
                }
                newEmail.appendChild(closeButton);
                emailsList.appendChild(newEmail);
            });
        }
    }

    function onKeyUp(e) {
        switch (e.keyCode) {
        case 188:
        case 13:
            emailInput.value = '';
            break;
        default:
            break;
        }
    }

    function onKeyDown(e) {
        switch (e.keyCode) {
        case 188:
        case 13:
            addNewEmail(e.target.value);
            break;
        default:
            break;
        }
    }

    function onInputBlur(e) {
        addNewEmail(e.target.value);
        emailInput.value = '';
    }

    function onInputPaste(e) {
        addNewEmail(e.clipboardData.getData('text'));
        e.preventDefault();
    }

    function onListClick(e) {
        if (e.target.tagName === 'BUTTON') {
            emailsList.removeChild(e.target.parentNode);
            e.stopPropagation();
        }
    }

    emailInput.addEventListener('keyup', onKeyUp);
    emailInput.addEventListener('keydown', onKeyDown);
    emailInput.addEventListener('blur', onInputBlur);
    emailInput.addEventListener('paste', onInputPaste);

    emailsList.addEventListener('click', onListClick);

    wrapper.appendChild(emailsList);
    wrapper.appendChild(emailInput);
    container.appendChild(wrapper);
}

export default EmailsInput;
