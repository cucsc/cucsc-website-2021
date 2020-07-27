
$(function() {

	// init hiding menu
	$('#mobilemenu').hide();
	$('#gotop').hide();

	var toggled = false;

	// on click menu button
	$('.menu:first').click(function() {

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

	// sets the position of the scrollgroup
	var sgOffset = $('.scrollgroup').offset().top;

	// for sticky scrolling with the topbar and the scrollgroups
	$(window).scroll(function() {
		// window offset on scroll
		let wOffset = $(window).scrollTop();

		// checks the navbar surpasses half the hero
		if (wOffset >= ($('.hero').height() / 2)) {
			// adds class called sticky which is fixed
			$('.navbar').addClass('sticky');
			// changes logo
			$('.logo').attr('src', 'images/logo_new.png');
			$('#gotop').show();
		} else {
			$('.navbar').removeClass('sticky');
			// changes logo
			$('.logo').attr('src', 'images/logo_circle.png');
			$('#gotop').hide();
		}

		// checks for scrollgroup scroll
		if (wOffset >= sgOffset - $('.navbar').height() - 32) {
			// adds class called scrollgroup which is fixed
			$('.scrollgroup').addClass('stickyGroup');
			// aligns scrollgroup to underneath the navbar
			$('.scrollgroup').css('top', ($('.navbar').height() + 32) + 'px');
			$('#thursday .title').css('padding-top', ($('.scrollgroup').outerHeight() + 32) + 'px');
		} else {
			$('.scrollgroup').removeClass('stickyGroup');
			$('#thursday .title').css('padding-top', 0);
		}

		// for light up scrolling btns
		if (wOffset >= $('#saturday').offset().top - $('.navbar').height() * 3 - 33) {
			$('.scrollbtn[href$="#saturday"]:first').addClass('active');
			$('.scrollbtn[href$="#friday"]:first').removeClass('active');
			$('.scrollbtn[href$="#thursday"]:first').removeClass('active');
		} else if (wOffset >= $('#friday').offset().top - $('.navbar').height() * 3 - 33) {
			$('.scrollbtn[href$="#friday"]:first').addClass('active');
			$('.scrollbtn[href$="#thursday"]:first').removeClass('active');
			$('.scrollbtn[href$="#saturday"]:first').removeClass('active');
		} else if (wOffset >= $('#thursday').offset().top - $('.navbar').height() * 3 - 33) {
			$('.scrollbtn[href$="#thursday"]:first').addClass('active');
			$('.scrollbtn[href$="#saturday"]:first').removeClass('active');
			$('.scrollbtn[href$="#friday"]:first').removeClass('active');
		}
	});

	// scrolls back to top smoothly
	$('#gotop').click(function(e) {
		e.preventDefault();
		$('html,body').animate({
            scrollTop: 0
        }, 500);
	});


	// Smooth scrolling from css-tricks thanks fam
	// https://css-tricks.com/snippets/jquery/smooth-scrolling/

	// Select all links with hashes
	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	// On-page links
	if (
	  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
	  &&
	  location.hostname == this.hostname
	) {
	  // Figure out element to scroll to
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  // Does a scroll target exist?
	  if (target.length) {
	    // Only prevent default if animation is actually gonna happen
	    event.preventDefault();
	    $('html, body').animate({
	      scrollTop: target.offset().top - $('.navbar').height() * 3 - 32
	    }, 500, function() {
	      // Callback after animation
	      // Must change focus!
	      var $target = $(target);
	      // $target.focus();
	      if ($target.is(":focus")) { // Checking if the target was focused
	        return false;
	      } else {
	        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	        // $target.focus(); // Set focus again
	      };
	    });
	  }
	}
	});
});
