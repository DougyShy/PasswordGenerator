// Assignment code here

// Assign defaults
var numChars = 0;
var lowercase, uppercase, numeric, specialChars = true;

var specialCharsOptions = ["!", "@", "#", "$", "%", "^", "&", "*"];
var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  // Initialize number of characters or if user cancels start over
  numChars = window.prompt("How many characters would you like the password to be? (8 - 128)", "8");
  if ((numChars == null)) {
    return false;
  }

  // Make sure numbers fall in range. Only accept NUMBERS between 8 and 128
  while((numChars < 8  || numChars > 128) || isNaN(numChars)) {
    alert("Only numbers between 8 and 128 will work. Please try again.");
    numChars = window.prompt("How many characters would you like the password to be? (8 - 128)", "8");
    if ((numChars == null)) {
      console.log("QUITTING");
      return false;
    }
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
    tempPassword.push(getRandomCharacter("lowercase"));
  }
  if (uppercase) {
    optionsChosen.push("uppercase");
    tempPassword.push(getRandomCharacter("uppercase"));
  }
  if (numeric) {
    optionsChosen.push("numeric");
    tempPassword.push(getRandomCharacter("numeric"));
  }
  if (specialChars) {
    optionsChosen.push("special");
    tempPassword.push(getRandomCharacter("special"));
  }

  // If the user picked 'no' for ALL criteria to include tell them to restart and why
  if(optionsChosen.length == 0) {
    alert("You chose for the password to have NO (0) criteria. Please choose at least ONE (1).");
    return "No (0) criteria specified. Please choose at least ONE (1).";
  }

  // Now randomize the rest of the characters
  for (i = (tempPassword.length); i < numChars; i++) {
    tempPassword.push(getRandomCharacter(optionsChosen[Math.floor(Math.random() * optionsChosen.length)]));
  }  

  // ** JUST FOR FUN -- RANDOMIZE THE RANDOM ARRAY TO MAKE SURE THAT ALL TYPES DON'T *AUTOMATICALLY* APPEAR INLINE FOR FIRST (4) ITEMS - NOT THAT IT MATTERS BUT JUST IN CASE #CYBERSECURITY
  //console.log(tempPassword); -- original
  tempPassword.sort(() => Math.random() - 0.5);
  //console.log(tempPassword); -- after sort
  
  // return generated password array as a string
  return tempPassword.join('');
}

function getRandomCharacter(format) {
  if (format == 'lowercase') {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  } else if (format == "uppercase") {
    return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
  } else if (format == "numeric") {
    return Math.floor(Math.random() * 10);
  } else if (format == "special") {
    return specialCharsOptions[Math.floor(Math.random() * specialCharsOptions.length)];
  }
}

generateBtn.addEventListener("click", writePassword);
