import { getEmailsFromInput, checkEmail, createHTMLElement } from './utils/index';
import './styles/main.scss';

const classPrefix = 'emails-input';
const defaultPlaceholder = 'add more people...';
const defaultRemoveLabel = 'remove';

/**
 * EmailsInput class.
 * Allows to create an input component that can take multiple email addresses,
 * it also provides visual validation for them, according to valid email patterns.
 * */
class EmailsInput {
    /**
     * Creates the main DOM elements of the component and adds the needed properties.
     * @param {HTMLElement} el - HTML that will contain the EmailsInput component.
     * @param {Object} options - Options to customize the component.
     * @param {string} options.placeholder - Placeholder property for the input element.
     * @param {string} options.removeLabel - Label for the remove button on each one of the mail blocks.
     */
    constructor(el, options = {}) {
        const container = el;
        this.options = options;
        const wrapper = createHTMLElement('DIV', [classPrefix]);

        this.emailsList = createHTMLElement('UL', [`${classPrefix}__mails-list`]);
        this.emailInput = createHTMLElement(
            'INPUT',
            [`${classPrefix}__input`],
            '',
            { placeholder: this.options.placeholder || defaultPlaceholder },
        );
        this.emailsList.appendChild(this.emailInput);

        this.emailInput.addEventListener('keyup', this.onKeyUp.bind(this));
        this.emailInput.addEventListener('blur', this.onInputBlur.bind(this));
        this.emailInput.addEventListener('paste', this.onInputPaste.bind(this));
        this.emailsList.addEventListener('click', this.onListClick.bind(this));

        wrapper.appendChild(this.emailsList);
        container.appendChild(wrapper);
    }

    /**
     * Add a new email or email addresses to the component, from
     * a given string. Can take multiple addresses separated by ','.
     * @param {string} textInput
     */
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
                    (this.options.removeLabel || defaultRemoveLabel),
                    { type: 'button' },
                );

                newEmail.dataset.value = item;
                newEmail.appendChild(closeButton);
                this.emailsList.appendChild(newEmail);
            });

            this.emailsList.appendChild(this.emailInput);
        }
    }

    /**
     * keyup listener for the email input HTML element
     * @param {KeyboardEvent} e
     */
    onKeyUp(e) {
        // 188 = ',' | 13 = Enter
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

    /**
     * blur listener for the email input HTML element
     * @param {FocusEvent} e
     */
    onInputBlur(e) {
        this.addNewEmail(e.target.value);
    }

    /**
     * paste listener for the email input HTML element
     * @param {ClipboardEvent} e
     */
    onInputPaste(e) {
        this.addNewEmail(e.clipboardData.getData('text'));
        this.emailInput.focus();
        e.preventDefault();
    }

    /**
     * click listener for the emails list element, this listeners
     * will handle click events on the remove button elements
     * @param {MouseEvent} e
     */
    onListClick(e) {
        if (e.target.tagName === 'BUTTON') {
            this.emailsList.removeChild(e.target.parentNode);
            e.stopPropagation();
        }
    }

    /**
     * Will return the valid emails that are rendered at a given moment
     * in the EmailsInput component.
     * @param {string} format - any value different than array, will return
     * the list of emails separated by commas.
     * @returns {([string]|string)}
     */
    getValidEmails(format = 'array') {
        const emails = [];
        this.emailsList.querySelectorAll('li').forEach((node) => {
            emails.push(node.dataset.value);
        });
        const validEmails = emails.filter((email) => checkEmail(email));
        return format === 'array' ? validEmails : validEmails.join(',');
    }

    /**
     * Will return the amount of valid emails that are rendered in the
     * component at a given time.
     * @returns {number}
     */
    getValidEmailsCount() {
        return this.getValidEmails().length;
    }
}

export default EmailsInput;
