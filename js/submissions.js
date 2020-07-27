$(function () {

	// init hiding menu
	$('#bioModal').hide();
	$('#mobilemenu').hide();
	$('#gotop').hide();

	var toggled = false;

	// on click menu button
	$('.menu:first').click(function () {

		// toggle flag
		toggled = !toggled;

		// adds or removes a class call toggled
		if (toggled) {
			$('.navbar').addClass('toggled');
			// changes the icon inside the menu button (x or bars)
			$('.menu').html('<i class="fas fa-times">');
			// toggles mobile menu
			$('#mobilemenu').show();
		} else {
			$('.navbar').removeClass('toggled');
			// changes the icon inside the menu button (x or bars)
			$('.menu').html('<i class="fas fa-bars">');
			// toggles mobile menu
			$('#mobilemenu').hide();
		}
	});

	// for sticky scrolling with the topbar
	$(window).scroll(function () {
		let wOffset = $(window).scrollTop();
		if (wOffset >= ($('.hero').height() / 2)) {
			// adds class called sticky which is fixed
			$('.navbar').addClass('sticky');
			$('.logo').attr('src', 'images/logo_new.png');
			$('#gotop').show();
		} else {
			$('.navbar').removeClass('sticky');
			$('.logo').attr('src', 'images/logo_circle.png');
			$('#gotop').hide();
		}
	});

	// scrolls back to top smoothly
	$('#gotop').click(function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	});

	$('#close').click(function () {
		// make body scrollable
		$('body').css('overflow-y', 'auto');
		// hide modal
		$('#bioModal').hide();
	});

});
