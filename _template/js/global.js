$(document).ready(function() {
	$(window).scroll(function(e) {
		if ($(window).scrollTop() >= $('#nav').offset().top + $('#nav').outerHeight() + 250) {
			$('#fixed-nav').addClass('fixed-nav--active');
		} else {
			$('#fixed-nav').removeClass('fixed-nav--active');
		}
	})

	$('#up').click(function() {
		$('#header').velocity('scroll', {duration: 1000, ease: 'ease-in-out'});
	})

	if ($('#map').length && DG) {
		var map;
	    DG.then(function () {
	        map = DG.map('map', {
	            center: [58.05374377598815,92.7461395],
	            zoom: 13,
	            scrollWheelZoom: false
	        });

			var myIcon = DG.icon({
			    iconUrl: 'img/map-target.png',
			    iconSize: [128, 150],
			    iconAnchor: [64, 150]
			});

			var cities = {
				kras: DG.marker([58.05374377598815,92.7461395], {icon: myIcon}).addTo(map),
				irk: DG.marker([60.28035428884728,104.33904149999991], {icon: myIcon}).addTo(map),
				kal: DG.marker([40.956352780249944,20.492772500000008], {icon: myIcon}).addTo(map)
			}

			$('.cities__show-on-the-map').click(function() {
				if (!$(this).hasClass('cities__show-on-the-map--active')) {
					var city = $(this).attr('id');
					map.setView(cities[city]._latlng);

					$('.cities__show-on-the-map--active').removeClass('cities__show-on-the-map--active');
					$(this).addClass('cities__show-on-the-map--active');
				}
			})
		})
	}

	$('#show-callback').click(function() {
		$('#overlay').addClass('overlay--active');
		$('#callback').addClass('modal--active');
		$('#callback').find('.text-input').first().focus();
	})

	$('.modal__close').click(function() {
		$(this).closest('.modal').removeClass('modal--active');
		$('#overlay').removeClass('overlay--active');
	})

	$('.make-order').click(function() {
		var volume = parseFloat($(this).closest('.product').attr('rel'));
		$('#bottle-volume').val(volume);
		showFullscreenForm(volume);
	})

	function showFullscreenForm(volume) {
		$('#fullscreen-form').addClass('fullscreen-form--active');
		$('#fullscreen-form').find('.text-input').first().focus();
		var bottleSelector = '#bottle';

		switch (volume) {
			case 0.5:
				bottleSelector += '05';
				break;
			case 1:
				bottleSelector += '1';
				break;
			case 1.5:
				bottleSelector += '15';
				break;
			case 6.5:
				bottleSelector += '65';
				break;
			default:
				break;
		}

		$(bottleSelector).addClass('fullscreen-form__bottle-img--active');
	}

	$('#close-fullscreen-form').click(function() {
		$('#fullscreen-form').removeClass('fullscreen-form--active');
		$('.fullscreen-form__bottle-img').removeClass('fullscreen-form__bottle-img--active');
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
