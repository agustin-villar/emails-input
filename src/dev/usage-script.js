/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const inputContainer = document.querySelector('#emails-input');
const emailsInput = new EmailsInput(inputContainer);

const emailsContainer = document.querySelector('#emails-component');
const emailsInputB = new EmailsInput(emailsContainer);

emailsInput.addNewEmail('hellothere,lollolo@gmail.com,amauro85@gmail.com');
console.log(emailsInput.getValidEmailsCount());

emailsInputB.addNewEmail('chocoloco@gmail.com,adsfasf');
console.log(emailsInputB.getValidEmails('string'));
