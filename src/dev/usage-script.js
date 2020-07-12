/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const inputContainer = document.querySelector('#emails-input');
const emailsInput = EmailsInput(inputContainer);

const emailsContainer = document.querySelector('#emails-component');
const emailsInputB = EmailsInput(emailsContainer);

emailsInput.addNewEmail('hellothere,lollolo@gmail.com');

emailsInputB.addNewEmail('chocoloco@gmail.com,adsfasf');
