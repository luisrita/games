$(document).ready( function(){
  startGame();
});

var randNumber, rightAnswer, maxSteps = 2, currentStep, level = 1, digits;


// Start the game on start btn click, 
// reset answers and steps variables and call gameProgression function
function startGame() {
  $('.js-start').on('click', function(e) {
    e.preventDefault();
    $(this).fadeOut(function(){
      $('.numbers-container').fadeIn();
    });

    rightAnswer = 0
    currentStep = 1;

    gameProgression();
  });
}


// Check to see which step we're in and call the 
// game mechanics functions untill we reach the last step
function gameProgression() {
  var time = 5000;

  if (currentStep <= maxSteps) {
    if(currentStep > 1) {
      resetNumber();
    }

    generateRandomNumber();
    hideNumber(time);
    comparePlayerInput();
  } else {
    var gameDivider = document.getElementsByClassName('game-divider')[0],
        gameWrapper = document.getElementsByClassName('game-wrapper')[0],
        resultsField = document.getElementsByClassName('js-result')[0],
        nextLevelBtn = document.getElementsByClassName('js-next-level')[0];

    gameWrapper.className += ' hide';
    gameDivider.className += ' active';   
    resultsField.innerHTML = 'Acertaste ' + rightAnswer + ' em ' + maxSteps;

    nextLevelBtn.addEventListener('click', advanceLevel);

    level++;
  }
}


// Calculate the number of digits according to the level
function calculateDigits(number) {
  var arrayOfDigits = [];

  for (var i = number; i >= 1; i--) {
    arrayOfDigits.push(0);
  }

  digits = arrayOfDigits.join('');
}


// Generate the number
function generateRandomNumber() {
  var numberField = document.getElementsByClassName('js-randNumber')[0];

  numOfDigits = level + 3;
  calculateDigits(numOfDigits);
  var multiplyer = parseInt(9 + digits);

  randNumber = Math.floor(Math.random()*multiplyer) + 10000;

  numberField.innerHTML = randNumber;
}


// Show the number during the determined seconds
function hideNumber(time) {
  setTimeout(function(){
    var numberField = document.getElementsByClassName('numbers-container__number')[0],
        playerInput = document.getElementsByClassName('numbers-container__input')[0];

    numberField.className += " hide";
    playerInput.className += " active";

    document.getElementById('player-input').focus();
  }, time)
  
  $('.progress-bar span').animate(
    {width: "100%"}, 
    time, 
    "linear",
    function() {
      $(this).css('width', '0');
    }
  );
}


// Create event listner to call checkNumbersMatch function
function comparePlayerInput() {
  var submit = document.getElementsByClassName('js-submit-number')[0];

  submit.addEventListener('click', checkNumbersMatch);

  currentStep++;
}


// Check if the user and random numbers are equal
function checkNumbersMatch() {
  var inputVal = parseInt(document.getElementById('player-input').value, 10),
      feedbackField = document.getElementsByClassName('js-feedback')[0],
      feedbackModal = document.getElementById('feedback-modal');

  if(randNumber === inputVal) {

    feedbackField.innerHTML = "Correcto!"
    rightAnswer++;

  } else {

    feedbackField.innerHTML = "Errado! A resposta correcta era: " + randNumber;

  }

  feedbackModal.className += (randNumber === inputVal) ? ' feedback-modal--correct active' : ' feedback-modal--wrong active';

  setTimeout(function() {feedbackModal.className = 'feedback-modal';}, 2000);

  setTimeout(gameProgression, 2000);
}


// Hide feedback modal and call the start level function
function advanceLevel() {
  var gameDivider = document.getElementsByClassName('game-divider')[0],
      gameWrapper = document.getElementsByClassName('game-wrapper')[0];

  gameWrapper.className = 'game-wrapper';
  gameDivider.className = 'game-divider';

  startLevel();
}


// Start a new level by reseting the answers and steps variables, 
// call the reset number and game progression functions
function startLevel() {
  rightAnswer = 0;
  currentStep = 1;
  resetNumber();
  gameProgression();
}


// Reset and hide the user input field and show 
// the generated number field again
function resetNumber() {
  document.getElementById('player-input').value = "";
  var numberField = document.getElementsByClassName('numbers-container__number')[0],
      playerInput = document.getElementsByClassName('numbers-container__input')[0];

  numberField.className = "numbers-container__number";
  playerInput.className = "numbers-container__input";
}
