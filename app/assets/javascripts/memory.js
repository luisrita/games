$(document).ready( function(){
  startGame();
});

var randNumber, rightAnswer, maxSteps = 10, currentStep;

function generateRandomNumber() {
  var numberField = document.getElementsByClassName('js-randNumber')[0];
  randNumber = Math.floor(Math.random()*90000) + 10000;

  numberField.innerHTML = randNumber;

  return randNumber;
}

function hideNumber(time) {
  setTimeout(function(){
    var numberField = document.getElementsByClassName('numbers-container__number')[0],
        playerInput = document.getElementsByClassName('numbers-container__input')[0];

    numberField.className += " hide";
    playerInput.className += " active";

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

    wrongAnswer++;
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

  if (currentStep < maxSteps) {
    if(currentStep > 1) {
      resetNumber();
    }

    generateRandomNumber();
    hideNumber(time);
    checkNumbersMatch();
  } else {
    console.log('You got ' + rightAnswer + ' in ' + maxSteps);
  }
}