$(document).ready( function(){
  startGame();
});

function generateRandomNumber() {
  var randNumber = Math.floor(Math.random() * 1001),
      numberField = document.getElementsByClassName('js-randNumber')[0];

  numberField.innerHTML = randNumber;
}

function hideNumber(time) {
  setTimeout(function(){
    var numberField = document.getElementsByClassName('numbers-container__number')[0],
        playerInput = document.getElementById('player-input');

    numberField.className += " hide";
    playerInput.className += " active";


  }, time)
  
  $('.progress-bar span').animate({width: "100%"}, time, "linear");
}

function startGame() {
  $('.js-start').on('click', function(){
    $(this).fadeOut(function(){
      $('.numbers-container').fadeIn();
    });

    time = 5000;

    generateRandomNumber();
    hideNumber(time);
  });
}