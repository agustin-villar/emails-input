import { strings } from './config/index';
import { getEmailsFromInput, checkEmail } from './utils/index';
import './styles/main.scss';

class EmailsInput {
    constructor(el) {
        const container = el;
        const wrapper = document.createElement('DIV');
        wrapper.classList.add('emails-input');

        this.emailsList = document.createElement('UL');
        this.emailsList.classList.add('emails-input__mails-list');

        this.emailInput = document.createElement('INPUT');
        this.emailInput.classList.add('emails-input__input');
        this.emailInput.placeholder = strings.PLACEHOLDER;

        this.emailInput.addEventListener('keyup', this.onKeyUp.bind(this));
        this.emailInput.addEventListener('blur', this.onInputBlur.bind(this));
        this.emailInput.addEventListener('paste', this.onInputPaste.bind(this));
        this.emailsList.addEventListener('click', this.onListClick.bind(this));

        this.emailsList.appendChild(this.emailInput);
        wrapper.appendChild(this.emailsList);
        container.appendChild(this.wrapper);
    }

    addNewEmail(textInput) {
        const possibleEmails = getEmailsFromInput(textInput);

        if (possibleEmails) {
            this.emailInput.value = '';

            possibleEmails.forEach((item) => {
                const newEmail = document.createElement('LI');
                newEmail.classList.add('emails-input__mail-item');

                const closeButton = document.createElement('BUTTON');
                closeButton.classList.add('emails-input__remove-email');
                closeButton.type = 'button';
                closeButton.innerText = 'Remove';

                newEmail.innerText = item;
                if (!checkEmail(item)) {
                    newEmail.classList.add('emails-input__mail-item--wrong');
                }
                newEmail.appendChild(closeButton);
                this.emailsList.appendChild(newEmail);
            });

            this.emailsList.appendChild(this.emailInput);
        }
    }

    onKeyUp(e) {
        switch (e.keyCode) {
        case 188:
        case 13:
            this.addNewEmail(e.target.value);
            this.emailInput.focus();
            break;
        default:
            break;
        }
    }

    onInputBlur(e) {
        this.addNewEmail(e.target.value);
    }

    onInputPaste(e) {
        this.addNewEmail(e.clipboardData.getData('text'));
        this.emailInput.focus();
        e.preventDefault();
    }

    onListClick(e) {
        if (e.target.tagName === 'BUTTON') {
            this.emailsList.removeChild(e.target.parentNode);
            e.stopPropagation();
        }
    }
}

export default EmailsInput;
