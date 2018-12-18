$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');

	$('.input_text .input__wrap').on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^a-zA-Zа-яА-ЯёЁ]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
	});

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

	function valueElementForm(nameElement) {
		var newNameElement = '.' + nameElement;
			element = $(newNameElement);
		element.each(function(index, el) {
			var elementInput = $(this).find($('input')),
				elementLabel = $(this).find($('label')),
				elementValue = index + 1;
			elementInput.attr('id', nameElement + '-' + elementValue);
			elementLabel.attr('for', nameElement + '-' + elementValue);
		});
		
	}
	valueElementForm('radio');
	

	$('form .btn').click(function(event) {
		event.preventDefault();
		var form = $(this).parents('form');
				inputsRequired = form.find('.input_required'),
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


	function dater(month) {
		totalDate.text(Date.today().add({months: month}).toString('d.M.yyyy'));		
	}


	var choiseTariff = $('.choiseTariff'),
			choiseMonths = $('.choiseMonths'),
			choisePeople = $('.choisePeople'),
			choiseCoupon = $('.choiseCoupon');


	var counter = $('.choise__counter'),
			counterText = $('.counter__text .sum');

	var totalDeadline = $('.total-deadline'),
			totalDate = $('.total-date'),
			totalUsers = $('.total-users'),
			totalSum = $('.total-summa'),
			totalGift = $('.total-gift');


	function sumReplace(block) {
		block.html(block.text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	}
	$('.sum').each(function(index, el) {
		sumReplace($(this));
	});

	function giftMonthsText(count) {
		if (count == 0) {
			return false;
		} else if (count == 1) {
			return '<span>' + count + '</span> месяц в подарок';
		} else if(count > 1 && count < 5){
			return '<span>' + count + '</span> месяца в подарок';
		} else{
			return '<span>' + count + '</span> месяцев в подарок';
		}
	}

	var indecWrap = $('.incdec__input');
	function choiseInputChecked() {
		var item = $('.choise__input:checked').parents('.choise__item'),
				index = item.attr('data-index'),
				name = item.find('.choise__subtitle').text();
				sum = item.find('.choise__price .sum').text();

		if($('.choise__input').is(':checked')){
			item.addClass('choise__item_selected');
			
			if (index <= 2) {
				$('.deadline__item:nth-of-type(1)').hide();
				$('.deadline__item:nth-of-type(2)').hide();
			} else{
				$('.deadline__item').show();
			}
			deadlineSum();
			counterText.text(sum)
		}

	}

	choiseInputChecked();
	
	$('.choise__item').click(function(event) {
		var input = $(this).find('.choise__input'),
				name = $(this).find('.choise__subtitle').text();

		choiseTariff.val(name);
		if($('.choise__input').not(':checked')){
			$('.choise__item').removeClass('choise__item_selected');
			$('.choise__input').removeAttr('checked');
			input.attr('checked', 'checked');
			choiseInputChecked();
			$('.choise__item').show();
			if ($(this).siblings('.choise__item')) {
				$(this).siblings('.choise__item').hide();
			} 
		}
		
		if ($(this).attr('data-counter') == 'false')  {
			counter.hide();
			choiseMonths.val(12);
			$('.deadline__item').removeClass('deadline__item_selected');
			$('.deadline__input').removeAttr('checked');
			$('.deadline__item:nth-of-type(3)').find('deadline__input').attr('checked', 'checked');
			$('.deadline__item:nth-of-type(3)').addClass('deadline__item_selected');
			$('.deadline__item:nth-of-type(3) input').attr('checked', 'checked');
		} else{
			counter.show();	
		}
	});
	

	$('.deadline__input:checked').parents('.deadline__item').addClass('deadline__item_selected');


	$('.deadline__item').click(function(event) {
		var input = $(this).find('.deadline__input'),
				value = Number(input.val());

		$('.deadline__input').removeAttr('checked');
		$('.deadline__item').removeClass('deadline__item_selected');

		input.attr('checked', 'checked');
		$(this).addClass('deadline__item_selected');
		dater(value);
	});


	function IncDec() {
		$('.incdec__btn').click(function(event) {
			var input = $(this).siblings('.incdec__input'),
					value = Number(input.val());
			
			if ($(this).hasClass('incdec__btn_minus')) {
				if(value > 1) {
					input.val(value-1);	
				}
				
				
			} else if ($(this).hasClass('incdec__btn_plus')){
				if(value < 999) {
					input.val(value+1);	
				}
			}
			deadlineSum();
			
		});
		$('.incdec__input').keyup(function(event) {
			var value = $(this).val();
			$(this).val(value.replace(/\D/g,''));
			deadlineSum();
		});
	}
	IncDec();

	function deadlineSum(){
		$('.deadline__item').each(function(indexus, el) {
			
			var input = $(this).find('.deadline__input'),
					months = Number(input.val()),
					sum = $(this).find('.deadline__title .sum'),
					desc = $(this).find('.deadline__desc'),
					item = $('.choise__input:checked').parents('.choise__item'),
					index = Number(item.attr('data-index')),
					price = item.find('.choise__price .sum'),
					priceVal = Number(price.text().replace(' ','')).toFixed(0),
					indecVal = indecWrap.val(),
					giftCount = 0,
					elIndex = indexus + 1,
					totalSumma = 0;



			if (index <= 2) {
				switch(elIndex){
					case 3:
						giftCount = 1;
						break;
					case 4:
						giftCount = 2;
						break;
				}
				totalSumma = priceVal / 12 * (months - giftCount);
				
			} else{
				switch(elIndex){
					case 1:
						giftCount = 1;
						break;
					case 2:
						giftCount = 2;
						break;
					case 3:
						giftCount = 3;
						break;
					case 4:
						giftCount = 6;
						break;
				}
				totalSumma = priceVal * indecVal * (months - giftCount);
			}
			sum.html(totalSumma.toFixed(0));
			totalUsers.html(TotalUsers(indecVal));
			
			desc.html(giftMonthsText(giftCount));

			if (input.is(':checked')) {
				var inputCheckedGift = $('.deadline__item_selected').find('.deadline__desc').text();
				totalSum.text($('.deadline__item_selected').find('.deadline__title .sum').text());	
				totalDeadline.html(TotalDeadline($('.deadline__item_selected').find('.deadline__input').val()));

				choiseMonths.val($('.deadline__item_selected').find('.deadline__input').val());
				choisePeople.val(indecVal);

				if (inputCheckedGift != "") {
					totalGift.html('+ ' + $('.deadline__item_selected').find('.deadline__desc').text() + '<br> от AmoCRM');	
				} else{
					totalGift.html('');
				}
			}
			
		});

	}
	

	function TotalDeadline(count) {
		var aferText,
				choise = Number($('.choise__item_selected').attr('data-index'));

		if (choise < 3) {
			count = 12;
		}
		if (count < 12){
			afterText = " мес.";
		} else if(count == 12){
			afterText = " год";
		} else{
			afterText = " года";
		}

		if (count >= 12) {
			count = (count / 12);
		}


		return count + afterText;
	}

	function TotalUsers(count){
		var beforeText = "x ",
				afterText,
				input = Number($('.choise__input:checked').val());
		if (input == 1) {
			count = 2;
		} if (input == 2) {
			count = 5;
		}
		if (count < 2) {
			afterText = " пользователь";
		} else if(count > 1 && count < 5){
			afterText = " пользователя";
		} else{
			afterText = " пользователей";
		}

		return beforeText + count + afterText;
	}

	choiseMonths.val(12);
	totalSum.text('9990');
	totalGift.html('+ 2 месяца в подарок <br>от AmoCRM');
	totalDeadline.text('1 год');
	dater(12);
	totalUsers.text('х 1 пользователь');
	$('.deadline__item').click(function() {
		deadlineSum();
	});


	var couponLink = $('.sub__coupon-link'),
			couponDesc = $('.sub__coupon-desc'),
			couponAlert = $('.coupon__alert'),
			couponInput = $('.coupon__arrea .input__wrap'),
			couponBtn = $('.coupon__btn');

	couponBtn.click(function(event) {
		couponVal = couponInput.val();

		if(couponVal != 'COUPON'){
			couponAlert.show();
		} else{
			couponLink.hide();
			couponAlert.hide();
			couponDesc.show();
			$.fancybox.close();
			choiseCoupon.val(couponVal);
		}
	});

	var comparisonWrap = $('.comparison__wrap'),
			comparisonBtn = $('.comparison__btn');
			comparisonBtnWrap = $('.comparison__btn-wrap');

	comparisonBtn.click(function(event) {
		comparisonWrap.toggleClass('comparison__wrap_show');
		var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: comparisonWrap.offset().top+"px"}, 500);
    comparisonBtnWrap.hide();
	});


	var inputsUr = $('.input_ur'),
			inputsUrWrap = inputsUr.find('input'),
			inputsFiz = $('.input_fiz'),
			inputsFizWrap = inputsFiz.find('input');

	function checkUR() {
		var radio = $('.popup__radio input:checked'),
				value = radio.val();
		if(value == 'fiz'){
			inputsFiz.show();
			inputsUr.hide();
			inputsUrWrap.val("");
		} else{
			inputsUr.show();
			inputsFiz.hide();
			inputsFizWrap.val("");
		}
	}
	checkUR();

	$('.popup__radio label').click(function(event) {
		$('.popup__radio input:checked').removeAttr('checked');
		$(this).prev('input').attr('checked', 'checked');
		checkUR();
	});
});
