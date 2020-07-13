# EmailsInput Library v.1.0.0

Provides a email addresses editor that allows to introduce multiple addresses at the same time, by typing or pasting them into the field. By default the library will add a new adress when:

- The `,` key is pressed
- The `enter` key is pressed
- The `input` field is out of focus
- Text is pasted into the field (If texts separated by `,` are pasted, the component will consider each one of them as a potential email address)

The component will also validate each email address at runtime by showing a visual indication of it. Email address can be removed by clicking on the cross button.

A demo page with a working example can be checked [here](https://agustin-villar.github.io/emails-input-page/)

## Prerequisites

- There's no need of external dependencies to use this library.

## Usage

Add the script to the HTML document where it will be used:

```html
<script src="emails-input.1.0.0.js"><script>
```

> It's advised to add the script right before closing the `body` tag.

Once the script is loaded, a new `EmailsInput` object can be created by using the `new` keyword, and specifying the DOM Element that will contain the component:

```js
let inputContainer = document.querySelector('#input-container');
let myInput = new EmailsInput(inputContainer);
```

Additionally, an `options` object can be specified as a second parameter to override the default values for the input's placeholder and the remove button label:

```js
let inputContainer = document.querySelector('#input-container');
let myInput = new EmailsInput(inputContainer, { placeholder: 'Type your email', removeLabel: 'delete' });
```

## Available methods

### addNewEmail(string):void
This method will take a string as an input and will add a new or multiple 'email blocks' to the component. If the string is a list of addresses separated by commas this method will try to create one new block for each one of the possible addresses.

```js
let myInput = new EmailsInput(inputContainer);

// a single address
myInput.addNewEmail('mail@example.com');

// multiple addresses
myInput.addNewEmail('mail@example.com,test@mail.com,user@gmail.com');
```

### getValidEmails(string):[string]|string
`getValidEmails` will check the email blocks rendered on the component and will filter out invalid email addresses, then it will return either an `array` or strings or a list of email addresses separated by `,` in `string` format. If the function parameter is anything differen than 'array', it will return the comma separated list.

```js
// By default will return an array of strings
myInput.getValidEmails(); // ['mail@example.com', 'test@mail.com', 'user@gmail.com']

// If a parameter different than the string 'array' is specified, will return a string.
myInput.getValidEmails('string'); // 'mail@example.com,test@mail.com,user@gmail.com'
```

### getValidEmailsCount():number
Will return the amount of valid email addresses that are available in the component at a given moment.
```js
myInput.getValidEmails(); // 3
```

## Styling
This library provide basic styling for the main components. Styles can be easily overwritten if needed by targeting the element class selectors.

## How to run this project for development?

- You will need, node `v12.18.0` (You can use [nvm](https://github.com/nvm-sh/nvm) to easily change between node versions).
- Navigate to the project root on a terminal window.
- Run `npm install && npm start` if you are running it for the first time.
- You will be able to access the application under `http://localhost:8000`
- After the first time you can just run `npm start`.

## Issues or questions?

If you run into any trouble while running the project or have questions about it, feel free to drop me a message at [amauro85@gmail.com](mailto:amauro85@gmail.com). I will be more than happy to take a look.

Thank you! 🤓