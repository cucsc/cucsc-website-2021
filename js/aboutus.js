
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

	//This will be for our scroll group
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
		if(wOffset >= $('#moments').offset().top - $('.navbar').height() * 3 -33){
		 $('.scrollbtn[href$="#moments"]:first').addClass('active');
		 $('.scrollbtn[href$="#technical"]:first').removeClass('active');
		 $('.scrollbtn[href$="#committee2019"]:first').removeClass('active');
	 } else if (wOffset >= $('#technical').offset().top - $('.navbar').height() * 3 - 33) {
			$('.scrollbtn[href$="#technical"]:first').addClass('active');
			$('.scrollbtn[href$="#committee2019"]:first').removeClass('active');
			$('.scrollbtn[href$="#moments"]:first').removeClass('active');
		} else if (wOffset >= $('#committee2019').offset().top - $('.navbar').height() * 3 - 33) {
			$('.scrollbtn[href$="#committee2019"]:first').addClass('active');
			$('.scrollbtn[href$="#technical"]:first').removeClass('active');
			$('.scrollbtn[href$="#moments"]:first').removeClass('active');
		}
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







	//Adds our big white bar at the top of the page to follow us when we scroll
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

	$('.imgbox .btn').click(function () {
		// this doesn't work and it's making me insane
		// $('.modal-content').scrollTop(0);
		$('.modal').css("opacity","1");

		// make body unscrollable
		$('body').css('overflow-y', 'hidden');

		// get info for the modal from the dictionary
		let ppl = folksdb[$(this).data('id')];

		// set the modal html to the things
		$('#bioModal .bioname').html(ppl['name']);
		$('#bioModal .bioimg').attr('src', ppl['pic']);
		$('#bioModal .biodesc').html(ppl['bio']);

		// show modal
		$('#bioModal').show();
	});

	var folksdb = {
		noah: {
			name: 'Noah Campbell',
			pic: 'images/folks/NoahWeb.jpg',
			bio: 'Noah is the reigning winner of the 2018 WEtech Alliance YQG Young Professional/Student of the Year award and the Chair of the 2019 Canadian Undergraduate Computer Science Conference. An undergraduate honours Computer Science student at the University of Windsor, Noah has significant experience working mainly in the higher education industry both as a Lab Instructor and Website Designer. In his spare time, Noah heads the Technical Team at INpact Collective, a social enterprise driving educational empowerment through the sale of artisan fashions. Noah is excited to bring his academic, industrial, and not-for-profit knowledge into organizing an invigorating and rewarding 2019 Canadian Undergraduate Computer Science Conference for all delegates.'
		},

		aislyn: {
			name: 'Aislyn Lewis-Laurent',
			pic: 'images/folks/AislynWeb.jpg',
			bio: 'Aislyn is the Vice Chair of Local Arrangements. She is currently enrolled as a double major in Biochemistry and Computer Science at the University of Windsor and aspires to work in computational chemistry upon graduation. Her passions include environmentalism, the ethical treatment of workers, and animal rights. In her free time, she enjoys cooking and going to yoga, as well as working on several personal software development projects. Aislyn aims to bring her strong networking skills and wide range of experiences as an asset in overseeing the successful logistics of the 2019 Canadian Undergraduate Computer Science Conference.'
		},

		david: {
			name: 'David Worley',
			pic: 'images/folks/DavidWeb.jpg',
			bio: 'David is a 3rd year undergraduate honours student pursuing degrees in both Mathematics and Computer Science, and also sits as the Vice-Chair of Finance and Administration for the 2019 Canadian Undergraduate Computer Science Conference. He is involved and experienced in both research and practical computer science skills through projects, academics, and competitive programming. Outside of the classroom, David is still involved in the higher education community, and is currently active as Undergraduate Representative of the University of Windsor’s School of Computer Science Council, and also assists as a member of the student-run Computer Science Society. He hopes to bring these personal and technical skills to assist in creating an unforgettable 2019 Canadian Undergraduate Computer Science Conference.'
		},

		/* Executive team  and below is most likely the website team */

		joel: {
			name: 'Joel Rorseth',
			pic: 'images/folks/JoelWeb.jpg',
			bio: 'Joel Rorseth is a fourth year Honours Computer Science student at UWindsor, and the President of the University of Windsor Computer Science Society. Joel is a 2 time Apple WWDC Scholarship winner, and takes a strong interest in mobile app development, artificial intelligence and machine learning.'
		},

		ryan: {
			name: 'Ryan Lebeau',
			pic: 'images/folks/RyanWeb.jpg',
			bio: 'Ryan is currently a third year Computer Science undergraduate that is excited to bring his experience to the 2019 Canadian Undergraduate Computer Science Conference. Ryan spends most of his academic time with high level programming languages and tutoring fellow undergraduates. When he is not focused on academics, Ryan enjoys all aspects of graphic design which has led him to help design many projects; ranging from clothing to websites. He is looking forward to being a part of this conference bringing all of his experience in the field of graphic design with him'
		},

		bryce: {
			name: 'Bryce Hughson',
			pic: 'images/folks/BryceWeb.jpg',
			bio: 'Bryce is an upcoming third year computer science student at the University of Windsor. Being on CUCSC\'s web design team has proven highly beneficial by providing a real-world experience for web development. Bryce is currently working a co-op term at the University of Windsor\'s Welcome Centre as Web Project Coordinator, and would like to thank CUCSC for giving him the experience he needed to prepare for a co-op job. Being on the advertising and promotion team along with website design, Bryce is ready to make this years CUCSC as successful as possible. During his spare time, Bryce likes to read, play games, and looking at dogs. '
		},

		/*harshdip: {
			name: 'Harshdip Singh Deogan',
			pic: 'images/folks/HarshdipWeb.jpeg',
			bio: ''
		},*/


		/*Below is the advertising team*/


		andrea: {
			name: 'Andrea Bonato',
			pic: 'images/folks/AndreaWeb.jpg',
			bio: 'Andrea Bonato is a second year student at the University of Windsor. She is currently involved with the Outstanding Scholars program and has been conducting her own research projects under the guidance of her professors. She is also a member of the Computer Science Society and has participated in many programming and knowledge based competitions. In relation to the CUCSC, she is currently a member of the advertising committee in hope to promote gender diversity within the computer science field and further promote undergraduate research.'
		},
		oaky: {
			name: 'Oksana Necio',
			pic: 'images/folks/OksanaWeb.jpg',
			bio: 'Oksana is a second year student in the Computer Science program at the University of Windsor. She is VP of Finance in the Computer Science Society and works as a Student Ambassador for the University. As a key member of the promotional/advertising team, Oksana aims to spread the reach and awareness of the 2019 Canadian Undergraduate Computer Science Conference, making it a cornerstone of undergraduate research and discourse in the industry on a national scale.'
		},
		mysteryMike: {
			name: 'Michael Valente',
			pic: 'images/folks/MichealWeb.jpg',
			bio: 'Michael is a third year Business student at the Odette School of Business at the University Of Windsor. Over the past few years, Michael has devoted his time and energy into many projects at Odette. Last year, Michael ran and hosted the Georgie-Odette Leadership Symposium, the largest leadership symposium in southwestern Ontario. He is excited to bring his social media skills, to further promote the importance of CUCSC.'
		},
		nuha: {
			name: 'Nuha Aljammas',
			pic: 'images/folks/NuhaWeb.jpg',
			bio: 'Nuha is a 2nd year student at the University of Windsor. She is pursuing a Bachelors degree in Computer Science with Software Engineering Specialization. Nuha was the recipient of multiple scholarships including IT services in computer science. Besides holding a teaching assistance position at the University of Windsor, she is currently working on a couple of personal projects. As a promotion coordinator, Nuha wishes to spread awareness of the 2019 Canadian Undergraduate Computer Science Conference. All accomplished undergraduate computer science students are encouraged to be a part of this experience.'
		},
		ivy: {
			name: 'Ivy Wills',
			pic: 'images/folks/IvyWills.jpg',
			bio: 'Ivy is a second-year computer science student from the University of Toronto Scarborough. Starting in her grade 12 year of high-school she joined her high-school robotics team, 5885 Wiredcats. Here she learned the basics of programming and developed an interest in machinery. During her grade 12 summer, she developed her teaching skills leading a month-long introduction to robotics class to grades 3-4. During her first year of computer science, she learned different programming languages and developed a curiosity in game development. She also enjoys swimming, going out to eat, and watching Netflix. Ivy hopes to use her experience and skills to help make the 2019 Canadian Undergraduate Computer Science Conference an ideal place for students and professionals to collaborate and discuss opportunities for computer science in Canada to expand.'
		},
		ashley: {
			name: 'Ashley Newton',
			pic: 'images/folks/AshleyNewton.jpg',
			bio: 'Ashley Newton is a first year Computer Science student at the University of Windsor. She is also a Technical Writer with experience in software documentation and front-end web development. Ashley has an affinity for both open source development and other types of open source collaboration as a means of innovation.<br><br>During her time in the software development industry she has been involved with organizing, promoting, and speaking at various tech events. She aims to lend her background to help make the 2019 Canadian Undergraduate Computer Science Conference a success.'
		}, 

		/*Sponsorship team*/
		formagin: {
			name: 'Austin Formagin',
			pic: 'images/folks/AustinWeb.jpg',
			bio: 'Austin is a Computer Science undergraduate at the University of Windsor and a member of the sponsorship team for the CUCSC. Austin was the team coordinator and the lead programmer for the Chatham-Kent First Robotics team and has experience in securing funding for groups via sponsorship. In his free time, he looks to continue with his involvement in First as a programming mentor for FRC teams in order to prepare teams for upcoming seasons. Austin is also looking forward to bringing his experience and knowledge to the table to benefit the organization of the conference.'
		},

		gehl: {
			name: 'Joshua Gehl',
			pic: 'images/folks/JoshWeb.jpg',
			bio: 'Josh is an computer science undergraduate at the University of WIndsor. He is a member of the organization committee for the CUCSC. He has competed in multiple programming competitions and has placed as high as first. Josh enjoys math courses, and loves computer science ones. In his downtime, he likes to hang out with friends, play video games, and complete online coding challenges from sites like HackerRank and Kattis.'
		},

		lupu: {
			name: 'Andrei Lupu',
			pic: 'images/folks/AndreiWeb.jpg',
			bio: 'Andrei is a third year Honours Computer Science student at McGill University. As a member of Mila - Quebec AI Institute, he is spending most of his time researching how artificial intelligence agents learn to behave as a group and has presented his works at conferences such as AAMAS and AAAI. When not in front of a computer, you can typically find him bouldering or hanging out with friends. As a translator for the event, his goal is to preserve the inclusive and historically bilingual aspect of CUCSC.'
		}

	}
});
