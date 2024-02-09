// Assignment code here
var numChars = 0;
var lowercase = true;
var uppercase = true;
var numeric = true;
var specialChars = true;

var specialCharsOptions = ["!", "@", "#", "$", "%", "^", "&", "*"];
var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  // Initialize number of characters or if user cancels start over
  numChars = window.prompt("How many characters would you like the password to be? (8 - 128)", 8);
  console.log(numChars);
  if (numChars == null) {
    // console.log("QUITTING");
    return false;
  }

  // Make sure numbers fall in range. Only accept numbers between 8 and 128
  while((numChars < 8  || numChars > 128) || isNaN(numChars)) {
    numChars = window.prompt("How many characters would you like the password to be? (8 - 128)");
    console.log(numChars); 
  }

  // Check to see what types of character the user wants to use in their random password
  lowercase = window.confirm("Lowercase letters will be used. Press 'Cancel' to remove...");
  uppercase = window.confirm("Uppercase letters will be used. Press 'Cancel' to remove..."); 
  numeric = window.confirm("Numbers will be used. Press 'Cancel' to remove...");
  specialChars = window.confirm("Special characters will be used. Press 'Cancel' to remove...");
  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var tempPassword = [];
  var optionsChosen = [];

  // Make sure that at least one preference is included
  if (lowercase) {
    optionsChosen.push("lowercase");
    tempPassword.push(getRandomLowercaseLetter());
  }
  if (uppercase) {
    optionsChosen.push("uppercase");
    tempPassword.push(getRandomUppercaseLetter());
  }
  if (numeric) {
    optionsChosen.push("numeric");
    tempPassword.push(getRandomNumber());
  }
  if (specialChars) {
    optionsChosen.push("special");
    tempPassword.push(getRandomSpecialCharacter());
  }

  // If the user picked 'no' for ALL criteria to include tell them to restart and why
  if(optionsChosen.length == 0) {
    alert("You chose for the password to have no criteria. Please retry.");
    return "No criteria specified.";
  }

  // Now randomize the rest
  for (i = (tempPassword.length); i < numChars; i++) {
    tempPassword.push(getRandomCharacter(optionsChosen[Math.floor(Math.random() * optionsChosen.length)]));
    console.log(getRandomCharacter(optionsChosen[Math.floor(Math.random() * optionsChosen.length)]));
  }  

  // ** JUST FOR FUN -- RANDOMIZE THE RANDOM ARRAY TO MAKE SURE THAT ALL TYPES DON'T *AUTOMATICALLY* APPEAR INLINE FOR FIRST ITEMS - NOT THAT IT MATTERS BUT JUST IN CASE #CYBERSECURITY
  console.log(tempPassword);
  tempPassword.sort(() => Math.random() - 0.5);
  console.log(tempPassword);
  
  // return generated password array as a string
  return tempPassword.join('');

}

function getRandomCharacter(format) {
  if (format == 'lowercase') {
    return getRandomLowercaseLetter();
  } else if (format == "uppercase") {
    return getRandomUppercaseLetter();
  } else if (format == "numeric") {
    return getRandomNumber();
  } else if (format == "special") {
    return getRandomSpecialCharacter();
  }
}

function getRandomLowercaseLetter() {
  var randomLowercaseLetter = "";
  randomLowercaseLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  return randomLowercaseLetter;
}

function getRandomUppercaseLetter() {
  var randomUppercaseLetter = "";
  randomUppercaseLetter = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
  return randomUppercaseLetter;
}

function getRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
}

function getRandomSpecialCharacter () {
  var randomSpecialCharacter = "";
  randomSpecialCharacter = specialCharsOptions[Math.floor(Math.random() * specialCharsOptions.length)];
  return randomSpecialCharacter;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
