$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');


	$('.input input').on('focus keyup', function(event) {
		var input = $(this).parents('.input');
				inputVal = $(this).val();

		if (inputVal != '') {
			if($(this).hasClass('input_phone')){
				if ($(this).find('input').val().length == '18') {
					input.addClass('input_focus');
				} else{
					$(this).addClass('input_error');
					$(this).removeClass('input_focus');
				}
			} else{
				input.addClass('input_focus');
			}
			
		} else{
			input.removeClass('input_focus');
		}
	});

	$('form .btn').click(function(event) {
		event.preventDefault();
		var form = $(this).parents('form');
				inputsRequired = form.find('.input'),
				inputsRequiredLength = inputsRequired.length,
				counter = 0;

		inputsRequired.each(function(index, el) {
			if ($(this).find('input').val() == '') {
				$(this).addClass('input_error');
				$(this).removeClass('input_focus');
			} else {
				$(this).removeClass('input_error');
				if($(this).hasClass('input_phone')){
					if ($(this).find('input').val().length == '18') {
						counter++;
					} else{
						$(this).addClass('input_error');
						$(this).removeClass('input_focus');
					}
				} else{
					counter++;
				}
				
			}
		});

		if (counter == inputsRequiredLength) {
			$.ajax({
		    type: "POST",
		    url: "order.php",
		    data: form.serialize()
				}).done(function() {
			    $.fancybox.close();
					$.fancybox.open({src  : '#popup-thanks',type : 'inline'});
			});

		}
	});

	$("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 1500);
    return false;
	});

	var hum = $('.hum'),
			nav = $('.panel__nav'),
			navClose = $('.panel__nav-close');

	hum.click(function(event) {
		nav.toggleClass('panel__nav_toggle');
	});

	navClose.click(function(event) {
		nav.toggleClass('panel__nav_toggle');
	});

	new WOW().init();
});
