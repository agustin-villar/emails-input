function checkEmail(email) {
    const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3})*$/;
    return emailPattern.test(email);
}

function getEmailsFromInput(input) {
    return input.replace(/ /g, '').split(',').filter((val) => val);
}

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
