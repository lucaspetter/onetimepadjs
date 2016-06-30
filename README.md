# OneTimePad.js

![OneTimePad.js](icon/icon-128.png)

A cryptographic library for the one-time pad cipher.

[Download](https://github.com/lucaspetter/onetimepadjs/releases/latest)


## About OneTimePad.js
OneTimePad.js is a JavaScript cryptographic library for the one-time pad cipher, based on the method described at [this site](http://krako.chez.com/nouveau/spy/cs013.htm). It makes encrypting and decrypting messages easy and it's compatible with nearly all web browsers.

The [one-time pad](https://en.wikipedia.org/wiki/One-time_pad) cipher is an algorithm for encrypting or decrypting messages. Encryption works by combining a message and a random key together with modular addition, and decryption is done by separating the key from the encrypted message with modular subtraction. It's mathematically impossible to crack a message that has been encrypted properly with a one-time pad as long as the key is truly random, is never re-used, is at least the same length as the message, and is kept secret.

## Potential uses
- Encrypted messaging between two people who have exchanged keys in advance.
- Securing data posted online by requiring a password to decrypt it, such as protecting an email address from web crawler robots that send spam.

## Example code
```
// Syntax
// otp(message, key, mode, keyRepetition)

// Encryption
otp("My secret message", "jE1&;bWi3f+w7TI8k", "encrypt", false);
// Returns "3754478888035502649989266753346614"

// Decryption
otp("3754478888035502649989266753346614", "jE1&;bWi3f+w7TI8k", "decrypt", false);
// Returns "My secret message"
```

## Requirements
OneTimePad.js is designed to be highly compatible with as many web browsers as possible, including old legacy version of browsers. It should work in all browsers that are in use today.

## Licence
OneTimePad.js is copyright © 2016 [Lucas Bleackley Petter](https://www.lucaspetter.com).

OneTimePad.js is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License](https://www.gnu.org/licenses/gpl.html) as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

OneTimePad.js is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
