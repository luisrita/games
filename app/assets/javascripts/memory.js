$(document).ready( function(){
  startGame();
});

var randNumber, rightAnswer, maxSteps = 2, currentStep, level = 1, digits;

function generateRandomNumber() {
  var numberField = document.getElementsByClassName('js-randNumber')[0];

  numOfDigits = level + 3;
  calculateDigits(numOfDigits);
  var multiplyer = parseInt(9 + digits);

  randNumber = Math.floor(Math.random()*multiplyer) + 10000;

  numberField.innerHTML = randNumber;
}

function calculateDigits(number) {
  var arrayOfDigits = [];

  for (var i = number; i >= 1; i--) {
    arrayOfDigits.push(0);
  }

  digits = arrayOfDigits.join('');
}

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

function startGame() {
  $('.js-start').on('click', function(){
    $(this).fadeOut(function(){
      $('.numbers-container').fadeIn();
    });

    rightAnswer = 0
    currentStep = 1;

    gameProgression();
  });
}

function checkNumbersMatch() {
  var submit = document.getElementsByClassName('js-submit-number')[0];

  submit.addEventListener('click', comparePlayerInput);

  currentStep++;
}

function comparePlayerInput() {
  var inputVal = parseInt(document.getElementById('player-input').value, 10);

  if(randNumber === inputVal) {
    console.log('success!');

    rightAnswer++;

  } else {
    console.log('aids');

    //wrongAnswer++;
  }

  setTimeout(gameProgression, 2000);
}

function resetNumber() {
  document.getElementById('player-input').value = "";
  var numberField = document.getElementsByClassName('numbers-container__number')[0],
      playerInput = document.getElementsByClassName('numbers-container__input')[0];

  numberField.className = "numbers-container__number";
  playerInput.className = "numbers-container__input";
}

function gameProgression() {
  var time = 5000;

  if (currentStep <= maxSteps) {
    if(currentStep > 1) {
      resetNumber();
    }

    generateRandomNumber();
    hideNumber(time);
    checkNumbersMatch();
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

function startLevel() {
  rightAnswer = 0;
  currentStep = 1;
  resetNumber();
  gameProgression();
}

function advanceLevel() {
  var gameDivider = document.getElementsByClassName('game-divider')[0],
      gameWrapper = document.getElementsByClassName('game-wrapper')[0];

  gameWrapper.className = 'game-wrapper';
  gameDivider.className = 'game-divider';

  startLevel();
}