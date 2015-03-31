$(document).ready( function(){

});

jQuery(function() {
	$('.js-start').on('click', function(){
		var randomNumber = Math.floor(Math.random()*10001);
		$(this).fadeOut(function(){
			$('.numbers').text(randomNumber);
			$('.numbers-container').fadeIn();
		});
	});
});