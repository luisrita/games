$(document).ready( function(){
  startGame();
});

function generateRandomNumber() {
  var randNumber = Math.floor(Math.random() * 1001),
      numberField = document.getElementsByClassName('js-randNumber')[0];

  numberField.innerHTML = randNumber;
}

function hideNumber() {
  setTimeout(function(){
    var numberField = document.getElementsByClassName('js-randNumber')[0],
        playerInput = document.getElementById('player-input');

    numberField.className += " hide";
    playerInput.className += " active";
  }, 5000)
}

function startGame() {
  $('.js-start').on('click', function(){
    $(this).fadeOut(function(){
      $('.numbers-container').fadeIn();
    });

    generateRandomNumber();
    hideNumber();
  });
}