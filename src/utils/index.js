// TODO: Add tests for utility methods

/**
 * Checks if an email address has the right format.
 * @param {string} email - the email address to be checked.
 * @returns {Boolean}
 */
function checkEmail(email) {
    const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,3}){1,2}$/;
    return emailPattern.test(email);
}

/**
 * Parse emails addresses from a given string of the format:
 * "addres@mail.com,addres@mail.com,addres@mail.com,addres@mail.com"
 * empty strings will be filtered out.
 * @param {string} input
 * @returns {[string]} An array of strings with the parsed emails.
 */
function getEmailsFromInput(input) {
    return input.replace(/ /g, '').split(',').filter((val) => val);
}

/**
 * Creates an HTML element based on a given configuration.
 * @param {string} tagName
 * @param {[string]} classNames - Array of strings with the classNames that the element will receive.
 * @param {string} innerText - InnerText property for the HTML Element.
 * @param {Object} attributes - Object with any possible attribute that the HTML Element may have.
 * @returns {[string]} An array of strings with the parsed emails.
 */
function createHTMLElement(tagName, classNames, innerText, attributes) {
    const element = document.createElement(tagName);

    if (classNames) {
        element.classList.add(...classNames.filter((className) => className));
    }

    if (innerText) {
        element.innerText = innerText;
    }

    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            element[key] = attributes[key];
        });
    }

    return element;
}

export { checkEmail, getEmailsFromInput, createHTMLElement };
