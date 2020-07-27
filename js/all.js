
$(function() {

	// init hiding menu
	$('#bioModal').hide();
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



	// for sticky scrolling with the topbar
	$(window).scroll(function() {
		let wOffset = $(window).scrollTop();
		if (wOffset >= ($('.hero').height() / 2)) {
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
	$('#gotop').click(function(e) {
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
		let people = guestsdb[$(this).data('id')];

		// set the modal html to the things
		$('#bioModal .bioname').html(people['name']);
		$('#bioModal .bioimg').attr('src', people['pic']);
		$('#bioModal .biodesc').html(people['bio']);

		// show modal
		$('#bioModal').show();
	});

	var guestsdb = {
		kobti: {
			name: 'Dr. Ziad Kobti',
			pic: 'images/guests/kobti.jpg',
			bio: 'Dr. Ziad Kobti holds a Ph.D. in Computer Science from Wayne State University. He is a full professor and director of the School of Computer Science at the University of Windsor. He is also the former President of the Canadian Artificial Intelligence Association (caiac.ca). He is an active researcher in the field of Artificial Intelligence (AI) specializing in nature-inspired evolutionary algorithms such as genetic and cultural algorithms used in search and optimization. These types of algorithms evolve near-optimal solutions to complex real-world and dynamic problems fairly quickly. He has applied these algorithms in agent modelling and decision support systems in various disciplines including healthcare, archaeology, and automotive. His work is published in revered and renowned venues; his past work on the virtual archaeology was featured in both Scientific American and Science Magazine. His goals are to continuously strive to develop new AI methods and apply them to new problems facing our society today and well into the future. His latest work centred on applying these algorithms to analyze social networks in an attempt to identify solutions applicable to health and social services.'
		},

		george: {
			name: 'George Hammerschmidt',
			pic: 'images/guests/George.jpg',
			bio: 'Key markets I have focused on are the Operational Support Systems (OSS) for telecommunications companies globally and information technology infrastructure solutions for SMB, Midmarket, and Large Enterprise throughout the United States. My experience and success working with teams to move early-stage startups from concept to IPO in software, hardware, and IT services has produced company listings on the NASDAQ, TSE & LSE.</br></br>As Executive Vice President and Chief Operating Officer of Nortec Communications, I am responsible for Corporate Strategy, Sales, Marketing, Finance Initiatives and Regional Operations.  As a Microsoft Gold Partner, we provide customized next generation cloud solutions to support business needs.</br></br>I have held positions at Orchestream Systems PLC as VP North and South American Sales, CrossKeys Systems Corporation as VP North American Sales, Canadian Pacific Railway as Director of Performance Management, and EDS (Electronic Data Systems) in Sales Engineering.</br></br>I hold a Master of Business Administration from York University and a Bachelor of Computer Science from the University of Windsor.  I am an owner and board member of several privately held real estate holding companies specializing in commercial, residential and agricultural properties throughout the United States.</br></br>Specialties: Global Sales & Marketing, Consulting Services, Business coaching and advice for Entrepreneurs and Startups, Channel Strategy & Development, Recruitment & Retention, Product Strategy & Management, Real Estate Acquisition and Management.'
		},

		rino: {
			name: 'Rino Rondinone',
			pic: 'images/guests/Rino.jpg',
			bio: 'Rino Rondinone is the Chief Information Officer of Green Shield Canada.<br><br>20+ year IT executive who leads complex IT transformations and manages large accounts, teams and senior relationships in the areas of IT delivery, strategy, sales and outsourcing. Deep insurance expertise complemented by telecommunications, retail, distribution and public sector experience. Currently CIO at Green Shield Canada, he is responsible for establishing the company’s vision for technology, increasing scale and the provision of all systems needed to meet GSC’s current and future objectives.<br><br>As a turn-around CIO at Foresters Financial, Rino integrated people, process and technology to lead a back-office and digital transformation program resulting in significantly improved business-aligned technology delivery.<br><br>While Vice President Insurance Leader at CGI, his mandate spanned all sales, strategy and delivery for Life Insurance industry clients managed out of the greater Toronto area, including large US and Canadian clients such as Manulife-John Hancock, Sun Life Financial and Foresters Financial. There, he gained significant transformation, sales and outsourcing experience, winning and delivering multiple $100M+ outsourcing pursuits, growing his team by 50% in one year to support the launch of a new office in Atlantic Canada, and running campaign management and sales enablement of CGI’s software / cloud-based solutions across Canada. Prior to his 15-year career at CGI, he led large-scale SAP R/3 implementations at GE Capital. He obtained his MBA from Queen’s School of Business in 2005.'
		},

		ramen: {
			name: 'Raman Mehta',
			pic: 'images/guests/YumYumRamen.jpg',
			bio: "Raman Mehta is the CIO and Vice President at Visteon (NYSEC:VC). Raman leads all facets of global information technology, including designing, developing and implementing global IT platforms and business processes to increase performance and help Visteon leverage technology as a competitive advantage. Raman is passionate about connected and autonomous vehicles and applying emerging AI technologies for Industry 4.0.<br><br>Raman joined Visteon in April 2017 from Fabrinet, where he was senior vice president and CIO at the global engineering and manufacturing services provider of complex optical and electromechanical components. He previously served as CIO and chief process architect for EWIE Company, a Tier 1 supplier to Ford Motor Co., driving enterprise-wide technology transformation. Before that, he spent more than 13 years at Oracle USA, Inc., where he was a director and advised Fortune 500 clients on business transformation.<br><br>Raman has earned several leadership awards including CIO magazine's 2018,2017,2013 CIO 100 Award, Computerworld's 2012 Premier 100 IT Leaders Award, and a Crain's Detroit Business CIO award. He has presented at several prominent IT conferences and authored various white papers. Raman has hands-on Digital Transformation experience that is narrated through frequent quotes, interviews and keynote presentations in Computerworld, CIO, Forbes, AutomotiveIT News and other events/publications.<br><br>Raman has an MBA from the University of Michigan's Ross School of Business, and a Bachelor of Engineering degree in Electrical and Electronics from the Birla Institute of Technology and Science in Pilani, India."
		},

		emily: {
			name: 'Emily Branton',
			pic: 'images/guests/Emily.jpg',
			bio: 'Emily became the President and part-owner of Link2Feed at only 24-years old.</br>In five years, she’s grown the company from a side project to an international business that has impacted nearly 3.3 million lives and been named one of B Corp’s “Best for the World” companies.</br>Her work has also been a launching pad for her travels, having visited 19 countries including 8 Canadian provinces and 23 US states.</br>Emily is a writer, speaker and yoga instructor who struggles to decide what she likes more- tea or red wine. She lives in Sarnia with her spouse and fellow Packer’s fan, Matt, and their black lab Clay (named after the great Clay Matthews).'
		},

		samantha: {
			name: 'Samantha Estoesta',
			pic: 'images/guests/Samantha.jpg',
			bio: 'Samantha Estoesta (she/her) is a multiple-published poet and long time #WomenInSTEM advocate. With an MA in Intercultural Communications and almost ten years in advocacy, communications, community development, community engagement, digital communications, digital design, and social media strategy, she centers her efforts on growing communities through reciprocal relationships. When she\'s not talking about being a brown female in tech, she can be found around town sharing her words, organizing others\' lives (semi-professionally!) or watching terrible Netflix shows.'
		}
	}

});
