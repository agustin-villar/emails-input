function checkEmail(email) {
    // eslint-disable-next-line max-len
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
