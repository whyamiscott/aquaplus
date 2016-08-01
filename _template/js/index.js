var bottleFrame = function($prevImg, $nextImg) {
	$prevImg.css('visibility', 'hidden');
	$nextImg.css('visibility', 'visible');
}

var bottleLoop = function() {
	var bottle1 = $('#bottle_1'),
		bottle2 = $('#bottle_2'),
		bottle3 = $('#bottle_3'),
		bottle4 = $('#bottle_4'),
		bottle5 = $('#bottle_5'),
		bottle6 = $('#bottle_6'),
		bottle7 = $('#bottle_7'),
		bottle8 = $('#bottle_8'),
		bottle9 = $('#bottle_9'),
		bottle10 = $('#bottle_10'),
		bottle11 = $('#bottle_11'),
		bottle12 = $('#bottle_12'),
		bottle13 = $('#bottle_13'),
		bottle14 = $('#bottle_14'),
		bottle15 = $('#bottle_15');

	setTimeout(bottleFrame, 65, bottle1, bottle2);
	setTimeout(bottleFrame, 130, bottle2, bottle3);
	setTimeout(bottleFrame, 195, bottle3, bottle4);
	setTimeout(bottleFrame, 260, bottle4, bottle5);
	setTimeout(bottleFrame, 325, bottle5, bottle6);
	setTimeout(bottleFrame, 390, bottle6, bottle7);
	setTimeout(bottleFrame, 455, bottle7, bottle8);
	setTimeout(bottleFrame, 520, bottle8, bottle9);
	setTimeout(bottleFrame, 585, bottle9, bottle10);
	setTimeout(bottleFrame, 650, bottle10, bottle11);
	setTimeout(bottleFrame, 715, bottle11, bottle12);
	setTimeout(bottleFrame, 780, bottle12, bottle13);
	setTimeout(bottleFrame, 845, bottle13, bottle14);
	setTimeout(bottleFrame, 910, bottle14, bottle15);
	setTimeout(bottleFrame, 975, bottle15, bottle1);
}


var bottleHeight = $('#bottle-container').outerHeight();

function bottleAndSlideAnimation($slide) {
	var newBottlePosition;
	var $target = $slide; // scroll target

	if ($slide.hasClass('slide--first')) { // we are going to first slide
		newBottlePosition = $slide.attr('rel');
		//$('#fixed-nav').removeClass('fixed-nav--active');
		$('#nav').addClass('nav--above-bottle');
		//$('#first-slide-sticker').addClass('prepare-for-animation');
	} else {
		newBottlePosition = $slide.offset().top + $slide.outerHeight() - $slide.attr('rel') - bottleHeight;
	}

	$slide.find('.will-animate').each(function() {
		$(this).addClass('prepare-for-animation');
	})

	$slide.find('.phantom-bottle').removeClass('phantom-bottle--active');

	if ($slide.hasClass('slide--fifth')) $(person).removeClass('person--phantom');

	bottleLoop(); //rotate bottle
	$('#bottle-container').velocity({top: newBottlePosition}, {duration: 1000, easing: 'ease-in-out'}); //move bottle
	if ($slide.hasClass('slide--first')) { // we are going to first slide
		$('#bottle').velocity({scale: [0.6796296296296296, 1]}, {duration: 1000, easing: 'ease-in-out'});
		$('#bottle-container').addClass('bottle-container--first-slide');
		$('#first-slide-sticker').addClass('sticker--over-bottle prepare-for-animation');

		$target = $('body');

		if ($('.slide--active').hasClass('slide--last')) { // we are go up via up button
			$('.slide').each(function() {
				if (!$(this).hasClass('slide--first') && !$(this).hasClass('slide--last')) {
					$(this).find('.phantom-bottle').removeClass('phantom-bottle--active');
				}
			})
		}
	}

	$($target).velocity('scroll', {duration: 1000, easing: 'ease-in-out', complete: function() { //move to slide
		//reset animation for old slide
		$('.slide--active .will-animate').each(function() {
			$(this).attr('style', '');
			$(this).removeClass('prepare-for-animation');
		})
		$('.slide--active .phantom-bottle').addClass('phantom-bottle--active');
		$('#first-slide-sticker').attr('style', '');
		$('.person--active').addClass('person--phantom');
		$('.person--active').removeClass('person--active');

		if ($slide.hasClass('slide--first') && $('.slide--active').hasClass('slide--last')) { // we are go up via up button
			$('.slide').each(function() {
				if (!$(this).hasClass('slide--first') && !$(this).hasClass('slide--last')) {
					$(this).find('.phantom-bottle').addClass('phantom-bottle--active');
				}
			})
		}

		// switch active slide
		$('.slide--active').removeClass('slide--active');
		$slide.addClass('slide--active');

		$('body').removeClass('not-scrollbar');

		//start animation for new slide
		var animatingFunction = slidesAnimatingFunctions[$slide.attr('id')];
		if (animatingFunction) animatingFunction();
	}});
}


function goToSlide($slide) {
	$('body').addClass('not-scrollbar');
	if ($('#bottle-container').hasClass('bottle-container--first-slide')) { // we are on the first slide and have to animate bottle
		$('#nav').removeClass('nav--above-bottle');

		$('.will-animate--first').each(function() {
			$(this).removeClass('prepare-for-animation');
		})
		$('#first-slide-sticker').removeClass('prepare-for-animation');

		$('#bottle-container').velocity({top: slide1BottleTopOffset}, {duration: 750, easing: 'ease', complete: function() {
			$('#bottle-container').removeClass('bottle-container--first-slide');
			$('#first-slide-sticker').removeClass('sticker--over-bottle');
			$('#bottle').velocity({scale: [1, 0.6796296296296296]}, {duration: 1000, easing: 'ease-in-out'}); //upscale bottle
			bottleAndSlideAnimation($slide);
		}});
	} else { //just go to next or prev slide;
		bottleAndSlideAnimation($slide)
	}
}


// START ANIMATION ON SLIDES
function initFirstSlide(test) {
	$('#first-slide-img').velocity({scale: [1, 0], opacity: 1}, {duration: 750, easing: [250, 20]}); // bg
	$('#first-slide-sticker').velocity({scale: [1, 0], opacity: 1}, {delay: 250, duration: 750, easing: [250, 20]}); // sticker
	$('#slide1__bottles').velocity({left: adaptiveElements.slide1.bottles.value, opacity: 1}, {delay: 500, duration: 750, easing: [250, 20]}); //bottles
	$('#slide1__fact1').velocity({right: 0, opacity: 1}, {delay: 750, duration: 750, easing: [250, 20]}); // fact text
	$('#slide1__fact2').velocity({right: 0, opacity: 1}, {delay: 900, duration: 750, easing: [250, 20]}); // fact text
}

function initSecondSlide() {
	$('#slide2__circle').velocity({scale: [1, 0], opacity: 1}, {duration: 750, easing: [250, 20]}); // blue circle
	$('#slide2__lower-third').velocity({scale: [1, 0], opacity: 1}, {delay: 250, duration: 750, easing: [250, 20]}); // lower third
	$('#slide2__info1').velocity({left: 0, opacity: 1}, {delay: 500, duration: 750, easing: [250, 20]}); // info text
	$('#slide2__info2').velocity({left: 0, opacity: 1}, {delay: 650, duration: 750, easing: [250, 20]}); // info text

}

function initThirdSlide() {
	$('#slide3__circle').velocity({scale: [1, 0], opacity: 1}, {duration: 750, easing: [250, 20]}); // blue circle
	$('#slide3__header').velocity({left: 0, opacity: 1}, {delay: 250, duration: 750, easing: [250, 20]}); // info in slide header
	$('#slide3__info1').velocity({left: 0, opacity: 1}, {delay: 500, duration: 750, easing: [250, 20]}); // info text
	$('#slide3__fact1').velocity({right: 0, opacity: 1}, {delay: 750, duration: 750, easing: [250, 20]}); // fact text
	$('#slide3__fact2').velocity({right: 0, opacity: 1}, {delay: 900, duration: 750, easing: [250, 20]}); // fact text
	$('#slide3__fact3').velocity({right: 0, opacity: 1}, {delay: 1050, duration: 750, easing: [250, 20]}); // fact text
}

function initFourthSlide() {
	$('#slide4__circle').velocity({scale: [1, 0], opacity: 1}, {duration: 750, easing: [250, 20]}); // blue circle
	$('#slide4__header').velocity({left: 0, opacity: 1}, {delay: 250, duration: 750, easing: [250, 20]}); // info in slide header
	$('#slide4__info1').velocity({left: 0, opacity: 1}, {delay: 500, duration: 750, easing: [250, 20]}); // info text
	$('#slide4__fact1').velocity({right: 0, opacity: 1}, {delay: 750, duration: 750, easing: [250, 20]}); // fact text
	$('#slide4__fact2').velocity({right: 0, opacity: 1}, {delay: 900, duration: 750, easing: [250, 20]}); // fact text
	$('#slide4__fact3').velocity({right: 0, opacity: 1}, {delay: 1050, duration: 750, easing: [250, 20]}); // fact text
}

function initFifthSlide() {
	$(person).velocity({opacity: 1}, {duration: 750, easing: 'ease'});
	$(person).addClass('person--active'); // move it
	$('#slide5__lower-third').velocity({scale: [1, 0], opacity: 1}, {delay: 250, duration: 750, easing: [250, 20]}); // lower third
}

var slidesAnimatingFunctions = {
	'slide1': initFirstSlide,
	'slide2': initSecondSlide,
	'slide3': initThirdSlide,
	'slide4': initFourthSlide,
	'slide5': initFifthSlide
}
// END ANIMATION ON SLIDES


// ADAPTIVE START
var adaptiveElements = {
	slide1: {
		bottles: {
			selector: '#slide1__bottles',
			property: 'left',
			value: '30px'
		}
	}
}

var slide1BottleTopOffset; // насколько бутыка будет подниматься на 1 слайде перед тем как начать опускаться

function adaptiveValues() {
	var windowHeight = $(window).outerHeight();

	slide1BottleTopOffset = 190;
	adaptiveElements.slide1.bottles.value = '30px';

	if (windowHeight <= 1045) {
		slide1BottleTopOffset = 160;
	}

	if (windowHeight <= 1000) {
		slide1BottleTopOffset = 130;
	}

	if (windowHeight <= 900) {
		adaptiveElements.slide1.bottles.value = '110px';
		slide1BottleTopOffset = 45;
	}

	if (windowHeight <= 799) {
		slide1BottleTopOffset = 5;
	}

	if (windowHeight <= 767) {
		adaptiveElements.slide1.bottles.value = '135px';
		slide1BottleTopOffset = 45;
	}

	return(adaptiveElements.slide1.bottles.value);
}

function changeBottlePosition() {
	var windowHeight = $(window).outerHeight();

	// slide1
	var $slide1 = $('#slide1');

	$slide1.attr('rel', '295');

	if (windowHeight <= 1045) $slide1.attr('rel', '265');
	if (windowHeight <= 1000) $slide1.attr('rel', '235');
	if (windowHeight <= 900) $slide1.attr('rel', '150');
	if (windowHeight <= 799) $slide1.attr('rel', '110');
	if (windowHeight <= 767) $slide1.attr('rel', '150');

	// 2, 3, 5
	var $slide2 = $('#slide2');
	var $slide3 = $('#slide3');
	var $slide4 = $('#slide4');

	$slide2.attr('rel', '150');
	$slide3.attr('rel', '150');
	$slide4.attr('rel', '150');

	if (windowHeight <= 945) {
		$slide2.attr('rel', '100');
		$slide3.attr('rel', '100');
		$slide4.attr('rel', '100');
	}

	if (windowHeight <= 875) {
		$slide2.attr('rel', '50');
		$slide3.attr('rel', '50');
		$slide4.attr('rel', '50');
	}
}

changeBottlePosition()
adaptiveValues();

$(window).resize(function() {
	adaptiveValues();
	changeBottlePosition()

	var $activeSlide = $('.slide--active')
	var activeElements = adaptiveElements[$activeSlide.attr('id')];

	for (var element in activeElements) {
		var value = activeElements[element]['value'];
		var property = activeElements[element]['property'];
		var selector = activeElements[element]['selector'];

		$(selector).css(property, value);
	}

	// change position of main bottle
	var bottlePosition;
	bottleHeight = $('#bottle-container').outerHeight();

	if ($activeSlide.hasClass('slide--first')) {
		bottlePosition = $activeSlide.attr('rel');
	} else {
		bottlePosition = $activeSlide.offset().top + $activeSlide.outerHeight() - $activeSlide.attr('rel') - bottleHeight;
	}

	$('#bottle-container').css('top', bottlePosition + 'px');

	if ($activeSlide.hasClass('slide--first')) {
		$('#header').velocity('scroll', {duration: 0});
	} else {
		$activeSlide.velocity('scroll', {duration: 0});
	}
})
// ADAPTIVE END


function generateRandomPerson() { // girl or kid on the last slide
	var i = Math.floor(Math.random() * (2));
	var person = $('.person')[i];

	$(person).addClass('person--choosen');
	$(person).addClass('person--phantom');

	var position = $(person).attr('rel');
	switch (position) {
		case 'left':
			$('.lower-third--big').addClass('lower-third--right');
			break;
		case 'right':
			$('.lower-third--big').addClass('lower-third--left');
			break;
	}

	return person;
}


var finishLoad = function() {
	$('#header').velocity('scroll', {duration: 0}); // set scroll to first slide
	$('body').removeClass('not-load');

	$('.will-animate--first').each(function() {$(this).addClass('prepare-for-animation')});
	$('#first-slide-sticker').addClass('prepare-for-animation');

	$('#loader').fadeOut(function() {
		initFirstSlide();
		$('#bottle-container').velocity({left: 0, opacity: 1}, {delay: 500, duration: 750, easing: [250, 20]}); //main bottle
	});
}

var person = generateRandomPerson();

function onWheel(e) {
	if ($(window).outerHeight() < 650) return true; // to small, enable scroll

	if ($('.velocity-animating').length) return false;

	var currentScrollOffset = $(window).scrollTop();
	var activeSlideOffset = $('.slide--active').offset().top;
	if ($('.slide--active').hasClass('slide--first')) {activeSlideOffset = 0}

	if ($('.slide--active').hasClass('slide--last')) {
		if (currentScrollOffset < activeSlideOffset) {
			var $target = $('.slide--active');
			$target.velocity('scroll', {duration: 500, easing: 'ease-in-out'});
			return false;
		}
	} else {
		if (currentScrollOffset != activeSlideOffset) {
			var $target = $('.slide--active');
			if ($target.hasClass('slide--first')) $target = $('body');

			$target.velocity('scroll', {duration: 500, easing: 'ease-in-out'});
			return false;
		}
	}


	if (e.originalEvent.deltaY <= 0) { //go up
		var $prevSlide = $('.slide--active').prev();
		var $footer = $('#footer');

		if (!$footer.hasClass('footer--active') && $prevSlide.length) {
			goToSlide($prevSlide);
			return false;
		} else if ($footer.hasClass('footer--active')) { // we are on the footer
			$('.slide--last').velocity('scroll', {duration: 500, easing: 'ease-in-out'});
			$('#footer').removeClass('footer--active');
			return false;
		}
    } else { // go down
		var $nextSlide = $('.slide--active').next();

		if ($nextSlide.length) {
			goToSlide($nextSlide);
			return false;
		} else if ($('.slide--active').hasClass('slide--last')) { // we are on the last slide?
			$('#footer').addClass('footer--active');
			return true; // enable scroll
		}
    }
}

$(document).keydown(function(e) {
    var code = e.keyCode;
	var up = [38, 33];
	var down = [40, 34];

	if (up.indexOf(code) >= 0 || down.indexOf(code) >= 0) {
		if ($(window).outerHeight() < 650) return true; // to small, enable scroll

		if ($('.velocity-animating').length) return false;

		var currentScrollOffset = $(window).scrollTop();
		var activeSlideOffset = $('.slide--active').offset().top;
		if ($('.slide--active').hasClass('slide--first')) {activeSlideOffset = 0}

		if ($('.slide--active').hasClass('slide--last')) {
			if (currentScrollOffset < activeSlideOffset) {
				var $target = $('.slide--active');
				$target.velocity('scroll', {duration: 500, easing: 'ease-in-out'});
				return false;
			}
		} else {
			if (currentScrollOffset != activeSlideOffset) {
				var $target = $('.slide--active');
				if ($target.hasClass('slide--first')) $target = $('body');
				$target.velocity('scroll', {duration: 500, easing: 'ease-in-out'});
				return false;
			}
		}


		if (down.indexOf(code) >= 0) {
			var $nextSlide = $('.slide--active').next();

			if ($nextSlide.length) {
				goToSlide($nextSlide);
				return false;
			} else if ($('.slide--active').hasClass('slide--last')) { // we are on the last slide?
				$('#footer').addClass('footer--active');
				return true; // enable scroll
			}
		}

		if (up.indexOf(code) >= 0) {
			var $prevSlide = $('.slide--active').prev();
			var $footer = $('#footer');

			if (!$footer.hasClass('footer--active') && $prevSlide.length) {
				goToSlide($prevSlide);
				return false;
			} else if ($footer.hasClass('footer--active')) { // we are on the footer
				$('.slide--last').velocity('scroll', {duration: 500, easing: 'ease-in-out'});
				$('#footer').removeClass('footer--active');
				return false;
			}
		}
	}
})


var imgCount = $('body').find('img').length;
var loadedImgCount = 1;

function onProgress(imgCount, loadedImgCount) {
	var per = Math.round(loadedImgCount / imgCount * 100);

	$('#progress-value').text(per);
	$('#progress-bar').css('width', per + '%');
	$('#progress-bottle').css('height', 100 - per + '%');
}

if ($('body').hasClass('main-page')) {
	$('body').imagesLoaded()
		.progress(function(instance, image) {
			onProgress(imgCount, loadedImgCount++);
			if (imgCount === loadedImgCount) setTimeout(finishLoad, 1000);
		});
}


$(document).ready(function() {
	// START INDEX PAGE
	$('body').bind("wheel", onWheel);

	$(window).scroll(function(e) {
		if ($(window).scrollTop() >= $('#slide2').offset().top) {
			$('#fixed-nav').addClass('fixed-nav--active');
		} else {
			$('#fixed-nav').removeClass('fixed-nav--active');
		}
	})

	$('#scroll-down').click(function() {goToSlide($('#slide2'))})

	$('#up').click(function() {
		if ($('.slide--last').hasClass('slide--active')) {
			goToSlide($('#slide1'));
			$('#footer').removeClass('footer--active');
		} else {
			$('#header').velocity('scroll', {duration: 1000, ease: 'ease-in-out'});
		}
	})
	// END INDEX PAGE

	$('#show-callback').click(function() {
		$('#overlay').addClass('overlay--active');
		$('#callback').addClass('modal--active');
		$('#callback').find('.text-input').first().focus();
	})

	$('.modal__close').click(function() {
		$(this).closest('.modal').removeClass('modal--active');
		$('#overlay').removeClass('overlay--active');
	})


	$('#lang-switcher').click(function() {
		var $that = $(this);
		var $ellipse = $that.find('.switcher__ellipse');

		$ellipse.velocity('stop');

		if (!$that.hasClass('switcher--on')) {
			$ellipse.velocity({left: '31px'}, 350, function() {
				$that.addClass('switcher--on');
				// switch language code here
			});
		} else {
			$ellipse.velocity({left: '1px'}, 350, function() {
				$that.removeClass('switcher--on');
				// switch language code here
			});
		}
	})
})
