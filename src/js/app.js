'use strict';

var app = {

	init: function() {
		new WOW().init();
		$('[data-toggle="tooltip"]').tooltip()
		this.scroll();
	},

	scroll: function() {
		// scroll to top
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('#scroll-to-top').fadeIn();
			} else {
				$('#scroll-to-top').fadeOut();
			}
		});

		$('#scroll-to-top').on('click', function(event) {
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0
			}, 800);
		});
	}

};