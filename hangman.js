//tell the user they are about to start the game and its instructions.
alert ("WELCOME TO HANGMAN. \nIn this game, you are supposed to guess a word, one letter at a time.");
            
            
//hint is provided to players.
alert ("Hint : They are inner-city suburbs of Melbourne");


//defining a set of words which will be guessed by the players.
let brandNames = [ "cremorne", "fitzroy", "prahran", "southbank", "windsor", "collingwood", "richmond", "abbotsford", "carlton", "parkville", "docklands", "toorak" ];
// 

//everytime the player plays the game a random word will be generated.
let randomNumber = Math.floor(Math.random () * brandNames.length);


//splitting the word into letters.
let randomBrand = brandNames[randomNumber]
let letters = randomBrand.split("")
let totalNumberOfLetters = randomBrand.length


// defining some global variables that will be used further in the code.
let currentState = []
let guessesMade = []


// each letter in the word is converted to a dash.
for (letters=0; letters <totalNumberOfLetters; letters++) {
    currentState[letters] = "_"
}


// total lives a player gets is 6.
let lives = 6;


//remaining letters before the first guess will be equal to the word length, after a guess they will change.
let remainingLetters = totalNumberOfLetters;


//every time a player plays the games, the first thing checked and displayed is if and how many lives there are.
console.log (currentState.toString());
console.log ("You have " + lives + " lives");

//this function checks whether the user entry is a valid guess or not.
function checkUserEntry (userGuessLowerCase, guessesMade) {
    let isValid = false
    /* this if statement check whether the user guess is a part of the alphabet or a special character, number, etc. It also checks whether the user 
    has made more than one entry in a single guess. */
    if (userGuessLowerCase.match(/[a-z]/i) && userGuessLowerCase.length == 1) { 
        // if the user has already made the same guess before, it will display a message asking them to enter another letter, without deducting lives.
        if (guessesMade.includes (userGuessLowerCase)) {
            console.log ("You have already entered this letter. Enter a new letter")
        } else {
            isValid = true
        }
    } else {
    /* if the user enters something other than a letter or tries to make 2 entries at once, the computer will ask them to enter another letter, without 
    deducting lives.*/
        console.log ("Only enter a single letter from a-z!")
    } 
    return isValid
} 


/* it is checked where the letter entered by the user is in the word. If it is at a position, it is printed. If it is not at a particular position, 
the loop continues to check the next position */
function findLetter (randomBrand, userGuessLowerCase, totalNumberOfLetters) { 
    // the foundAt array is an empty array which stores the index in the word where the guessed letter is
    let foundAt = []
    for (let position = 0 ; position < totalNumberOfLetters ; position++  ) {
        // the for loop checks every letter in the word for the letter that is entered by the user
        if (userGuessLowerCase == randomBrand[position]) { 
            // when that position is found, it is stored in the foundAt array
            foundAt.push(position)      
        } else { 
            // if the letter is not at a position, then the loop just moves forward to the next position
            continue
        }
    } 
    return foundAt
}   


// this function automatically detects the number of lives left and prints an appropriate message
function livesLeft (lives) {
    // an empty string is created which stores the message to be displayed at different phases in the game
    let message = ""
     if (lives > 1) {
        // if there is more than one life, the plural of life (lives) is printed
        message = "You have " + lives + " lives left. " + "Your guesses -" + guessesMade
    } else if (lives == 1) {
        // if there is one life left, life (singular) is printed
        message = "You have " + lives + " life left. " + "Your guesses -" + guessesMade
    } else { 
        // otherwise, if there are no lives left, the game ends
        message = "Game has ended. Refresh to play again :)"
    }
    return message
}


// this function is used to store the correct guesses made by the users in the word
function refreshCurrentState (foundAt, currentState, userGuessLowerCase) {
    for (let i = 0 ; i < foundAt.length ; i ++) {
        // foundAtPositions variable stores the index(s) where the guessed letter is stored
        let foundAtPositions = foundAt[i]
        // this splice function removes the dash where the letter is supposed to be added
        currentState.splice(foundAtPositions, 1)
        // this splice function adds the letter at the stored index
        currentState.splice(foundAtPositions,0,userGuessLowerCase)
    }
    console.log(currentState.toString())
    return currentState
} 


// this while loop works while the user has lives left.      
while (lives > 0) { 
// if there are lives left, it checks whether all the letters of the random word given to the user have been guessed.
    if (remainingLetters > 0) {
        // if there are any letters left to be guessed, the user is prompted to enter another letter.     
        let userGuess = prompt ("Guess a letter");
        // to avoid errors that might occur if an upper case letter is entered, all letters entered are converted to lower case.
        let userGuessLowerCase = userGuess.toLowerCase()
        // check if user guess is a valid or invalid entry
        let isValid = checkUserEntry (userGuessLowerCase, guessesMade)
        // all guesses are stored in the array guessesMade
        guessesMade.push (userGuessLowerCase)
        if (isValid == true) {
            // if the letter guessed is a part of the word, we use our function (findLetter) to determine all positions of the letter in the word and print them.
            if (randomBrand.includes (userGuessLowerCase)) {
                foundAt = findLetter (randomBrand, userGuessLowerCase, totalNumberOfLetters); 
                // as a correct guess has been made remaining letters of the word are reduced by the number of times the guessed letter is in the word.   
                remainingLetters = remainingLetters - foundAt.length
                // next, the word is updated with the correct guess
                updatedCurrentState = refreshCurrentState (foundAt, currentState, userGuessLowerCase)
                currentState = updatedCurrentState
                console.log (livesLeft (lives))
            } else {lives --;
                // if the letter guessed is not a part of the word, one life is deducted
                console.log (currentState.toString())
                console.log (livesLeft (lives))
                
            }
        } else {
            // if input is invalid, the user will be asked for a new guess.
            continue
        }
    } else {
        // if there are no letters left to be guessed, it means the user has guessed the word and won.
        console.log (remainingLetters +"rl")
        console.log ("Congratulations!!! You guessed the word.")
        break 
    } 
}