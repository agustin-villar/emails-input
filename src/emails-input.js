import { getEmailsFromInput, checkEmail, createHTMLElement } from './utils/index';
import './styles/main.scss';

const classPrefix = 'emails-input';
const placeholder = 'add more people...';
const removeLabel = 'remove';

class EmailsInput {
    constructor(el) {
        const container = el;
        const wrapper = createHTMLElement('DIV', [classPrefix]);

        this.emailsList = createHTMLElement('UL', [`${classPrefix}__mails-list`]);
        this.emailInput = createHTMLElement(
            'INPUT',
            [`${classPrefix}__input`],
            '',
            { placeholder },
        );
        this.emailsList.appendChild(this.emailInput);

        this.emailInput.addEventListener('keyup', this.onKeyUp.bind(this));
        this.emailInput.addEventListener('blur', this.onInputBlur.bind(this));
        this.emailInput.addEventListener('paste', this.onInputPaste.bind(this));
        this.emailsList.addEventListener('click', this.onListClick.bind(this));

        wrapper.appendChild(this.emailsList);
        container.appendChild(wrapper);
    }

    addNewEmail(textInput) {
        const possibleEmails = getEmailsFromInput(textInput);

        if (possibleEmails) {
            this.emailInput.value = '';

            possibleEmails.forEach((item) => {
                const newEmail = createHTMLElement(
                    'LI',
                    [`${classPrefix}__mail-item`, checkEmail(item) ? '' : `${classPrefix}__mail-item--wrong`],
                    item,
                );

                const closeButton = createHTMLElement(
                    'BUTTON',
                    [`${classPrefix}__remove-email`],
                    removeLabel,
                    { type: 'button' },
                );

                newEmail.dataset.value = item;
                newEmail.appendChild(closeButton);
                this.emailsList.appendChild(newEmail);
            });

            this.emailsList.appendChild(this.emailInput);
        }
    }

    onKeyUp(e) {
        // 188 = ',' | 13 = Enter
        switch (e.keyCode) {
        case 188:
        case 13:
            this.addNewEmail(e.target.value);
            this.emailInput.focus();
            e.stopPropagation();
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

    getValidEmails(format = 'array') {
        const emails = [];
        this.emailsList.querySelectorAll('li').forEach((node) => {
            emails.push(node.dataset.value);
        });
        const validEmails = emails.filter((email) => checkEmail(email));
        return format === 'array' ? validEmails : validEmails.join(',');
    }

    getValidEmailsCount() {
        return this.getValidEmails().length;
    }
}

export default EmailsInput;
