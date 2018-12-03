/* 
GAME FUNCTION
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn");
      guessInput = document.querySelector("#guess-input");
      message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener 
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`The number has to be between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${ winningNum } is the correct number! You won!`) 

  } else {
    // Wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      // Game over - Lost 
      gameOver(false, `Game over! You lost! The correct number was ${winningNum}`);

    } else {
    //  Game continues - Answer wrong

    // Change border color
      guessInput.style.borderColor = 'red';
    
    // Clear input
      guessInput.value = '';
    // Let the users know they put the chose the wrong number
    setMessage(`${guess} is not correct number. You have ${guessesLeft} guess left!`, 'red')

    }
  }
});

// Game Over 
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable Input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}

// Get Winning number
function getRandomNum(min, max) {
  return (Math.floor(Math.random()*(max-min+1)+min));
}

// setMessage function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}




