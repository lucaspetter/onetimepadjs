/* OneTimePad.js
 * Version 1.0.1
 *
 * A JavaScript library implementation for the one-time pad cipher.
 * Based on the method described at http://krako.chez.com/nouveau/spy/cs013.htm
 *
 *
 * There are three functions:
 *
 * 1. encode(text)
 *     Input:   A text string.
 *     Output:  Uses the codebook to output a number-encoded "code" string.
 *     Example: encode("Hello world") returns "3304111114".
 *     Notes:   Any input character that is not in the codebook will be filtered out.
 *              This is not encryption, the characters are merely substituted with numbers.
 *
 * 2. decode(code)
 *     Input:   A number-encoded "code" string, such as the output of encode().
 *     Output:  Uses the codebook to output a text string.
 *     Example  decode("3304111114") returns "Hello world".
 *     Notes:   This is not decryption, the output is merely the reverse of encode().
 *
 * 3. otp(message, key, mode, keyRepetition)
 *     Input:   message: Either a plaintext string or an encrypted message string.
 *              key: The encryption key.
 *              mode: Either "encrypt" or "decrypt".
 *              keyRepetition: true or false. If the key is shorter than the message,
 *                  this sets whether the script should repeat the key to make it long enough.
 *                  This is NOT secure. For serious usage, the keyRepetition flag should
 *                  never be set to true and the key should always be long enough.
 *     Output:  Depending on whether the mode is set to "encrypt" or "decrypt",
 *              either an encrypted ciphertext string or a decrypted plaintext string.
 *     Example: If message is "Hello" and key is "m6R*N":
 *              otp("Hello", "m6R*N", "encrypt", false) returns "4552548243"
 *              otp("4552548243", "m6R*N", "decrypt", false) returns "Hello"
 *     Notes:   This function performs the actual one-time pad encryption or decryption.
 *              For the greatest security, the key should be as random as possible.
 *              Both the inputs codeMessage and codeKey need to be encoded with encode().
 *              Decrypted output is still number-encoded, so use decode() to get the plaintext.
 *
 *
 * Examples for implementing this library:
 *
 *     Encryption:
 *         Input plaintext message "My secret message".
 *         Input plaintext key "jE1&;bWi3f+w7TI8k".
 *             return otp("My secret message", "jE1&;bWi3f+w7TI8k", "encrypt", false);
 *         This returns encrypted ciphertext "3754478888035502649989266753346614".
 *
 *     Decryption:
 *          Input encrypted message "3754478888035502649989266753346614".
 *          Input plaintext key "jE1&;bWi3f+w7TI8k".
 *             return otp("3754478888035502649989266753346614", "jE1&;bWi3f+w7TI8k", "decrypt", false);
 *         This returns decrypted plaintext "My secret message".
 */


/**
 *
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this page.
 *
 * Copyright (C) 2016  Lucas Bleackley Petter
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */


"use strict";

// Codebook for converting between characters and code numbers.
var codebook = [];
codebook[0] = "a";
codebook[1] = "b";
codebook[2] = "c";
codebook[3] = "d";
codebook[4] = "e";
codebook[5] = "f";
codebook[6] = "g";
codebook[7] = "h";
codebook[8] = "i";
codebook[9] = "j";
codebook[10] = "k";
codebook[11] = "l";
codebook[12] = "m";
codebook[13] = "n";
codebook[14] = "o";
codebook[15] = "p";
codebook[16] = "q";
codebook[17] = "r";
codebook[18] = "s";
codebook[19] = "t";
codebook[20] = "u";
codebook[21] = "v";
codebook[22] = "w";
codebook[23] = "x";
codebook[24] = "y";
codebook[25] = "z";
codebook[26] = "A";
codebook[27] = "B";
codebook[28] = "C";
codebook[29] = "D";
codebook[30] = "E";
codebook[31] = "F";
codebook[32] = "G";
codebook[33] = "H";
codebook[34] = "I";
codebook[35] = "J";
codebook[36] = "K";
codebook[37] = "L";
codebook[38] = "M";
codebook[39] = "N";
codebook[40] = "O";
codebook[41] = "P";
codebook[42] = "Q";
codebook[43] = "R";
codebook[44] = "S";
codebook[45] = "T";
codebook[46] = "U";
codebook[47] = "V";
codebook[48] = "W";
codebook[49] = "X";
codebook[50] = "Y";
codebook[51] = "Z";
codebook[52] = "0";
codebook[53] = "1";
codebook[54] = "2";
codebook[55] = "3";
codebook[56] = "4";
codebook[57] = "5";
codebook[58] = "6";
codebook[59] = "7";
codebook[60] = "8";
codebook[61] = "9";
codebook[62] = "`";
codebook[63] = "~";
codebook[64] = "!";
codebook[65] = "@";
codebook[66] = "#";
codebook[67] = "$";
codebook[68] = "%";
codebook[69] = "^";
codebook[70] = "&";
codebook[71] = "*";
codebook[72] = "(";
codebook[73] = ")";
codebook[74] = "-";
codebook[75] = "=";
codebook[76] = "_";
codebook[77] = "+";
codebook[78] = "[";
codebook[79] = "]";
codebook[80] = "{";
codebook[81] = "}";
codebook[82] = "|";
codebook[83] = "\\";
codebook[84] = ";";
codebook[85] = ":";
codebook[86] = "'";
codebook[87] = "\"";
codebook[88] = ",";
codebook[89] = ".";
codebook[90] = "<";
codebook[91] = ">";
codebook[92] = "/";
codebook[93] = "?";
codebook[94] = " ";
codebook[95] = "\n";
codebook[96] = "\r";
codebook[97] = "\t";
codebook[98] = "–";
codebook[99] = "—";

// Convert input text characters to code numbers using the codebook.
function encode(text) {
	// Loop through each text character.
	var code = [];
	for (var i=0; i<text.length; i++) {
		// Check if the character is in the codebook, filter it out if it's not.
		if (codebook.indexOf(text[i]) !== -1) {
			// Get the character's code number from the code book.
			code[i] = codebook.indexOf(text[i]).toString();
			// Prepend a leading zero if code number is in range 0-9.
			if (code[i].length === 1) {
				code[i] = "0" + code[i];
			}
		}
	}
	return code.join("");
}

// Convert input code numbers to text characters using the codebook.
function decode(code) {
	// Split the code number string into an array where each item is 2 digits long.
	var codeLength = code.length / 2;
	code = code.match(/.{1,2}/g);
	// Loop through each two-digit code number.
	var text = [];
	for (var i=0; i<codeLength; i++) {
		// Convert the code from string to number format by multiplying by 1.
		code[i] *= 1;
		// Get the code number's character from the codebook.
		text[i] = codebook[code[i]];
	}
	return text.join("");
}

// Encrypt or decrypt a message with a key.
function otp(message, key, mode, keyRepetition) {
	var codeMessage, error;
	// The message and key must not be empty.
	if (message === "" || key === "") {
		error = "Error: The message and key must not be be empty.";
		console.log("[OneTimePad.js] " + error);
		return error;
	}
	// Convert the message and key to number-encoded strings using the codebook.
	var codeKey = encode(key);
	// Only number-encode the message if using encrypt mode. In decrypt mode, the message should already be number-encoded.
	if (mode == "encrypt") {
		codeMessage = encode(message);
	} else if (mode == "decrypt") {
		if (!isNaN(message)) {
			codeMessage = message;
		} else {
			error = "Error: When decrypting, the message must only contain numbers.";
			console.log("[OneTimePad.js] " + error);
			return error;
		}
	}
	// The key should be at least the same length as the message.
	if (codeKey.length < codeMessage.length) {
		// If the key is shorter than the message and the keyRepetition flag is true, then repeat the key until it's long enough.
		// This is NOT secure. For serious usage, the keyRepetition flag should never be set to true and the key should always be long enough.
		if (keyRepetition === true) {
			if (mode == "encrypt") {
				console.log("[OneTimePad.js] WARNING: The key is shorter than the message.\nThe keyRepetition flag has been set, so OneTimePad.js will now repeat the key until it's long enough, but this is not secure. Repetition of the key will cause statistical patterns in the ciphertext that will make it easier for a third party to decrypt it without the key. You really should use a key at that's least the same length as the message.");
			}
			while (codeKey.length < codeMessage.length) {
				codeKey += codeKey;
			}
		// Otherwise, if the key is too short, fail with an error.
		} else {
			error = "Error: The key is shorter than the message.";
			console.log("[OneTimePad.js] " + error);
			return error;
		}
	}
	// Split both the code strings into arrays where each array item is 1 digit long.
	codeMessage = codeMessage.split("");
	codeKey = codeKey.split("");
	// Loop through each one-digit code number.
	var codeOutput = [];
	for (var i=0; i<codeMessage.length; i++) {
		// Convert the codes from string to number format by multiplying by 1.
		codeMessage[i] *= 1;
		codeKey[i] *= 1;
		// Perform the OTP encryption by adding the message code number and key code number together.
		if (mode == "encrypt") {
			codeOutput[i] = (codeMessage[i] + codeKey[i]);
			// Number must be a single digit in range 0-9.
			// Use modular addition, modulo 10 - allow no carrying during addition.
			if (codeOutput[i] > 9) {
				codeOutput[i] -= 10;
			}
		}
		// Perform the OTP decryption by subtracting the key code number from the message code number.
		if (mode == "decrypt") {
			codeOutput[i] = (codeMessage[i] - codeKey[i]);
			// Number must be a single digit in range 0-9.
			// Use modular subtraction, modulo 10 - allow no carrying during subtraction.
			// Allow no negative numbers. If number is negative, make it positive.
			if (codeOutput[i] < 0) {
				codeOutput[i] += 10;
			}
		}
	}
	// If encrypting, return a number-encoded string. If decrypting, decode the number-encoded string to return the plaintext.
	var outputString = codeOutput.join("");
	if (mode == "decrypt") {
		return decode(outputString);
	} else {
		return outputString;
	}
}
