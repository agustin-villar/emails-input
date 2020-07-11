function checkEmail(email) {
    // eslint-disable-next-line max-len
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

function getEmailsFromInput(input) {
    // ivan@mail.ru, max@mail.ru,   ivan@mail, max@mail.ru, ivan@mail.ru, max@mail.ru,
    return input.replace(/ /g, '').split(',').filter((val) => val);
}

export { checkEmail, getEmailsFromInput };
