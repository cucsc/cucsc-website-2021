
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
			$('#speakers .title').css('padding-top', $('.scrollgroup').outerHeight() + 'px');
		} else {
			$('.scrollgroup').removeClass('stickyGroup');
			$('#speakers .title').css('padding-top', 0);
		}

		// for light up scrolling btns
		if (wOffset >= $('#workshops').offset().top - $('.navbar').height() * 2 - 1) {
			$('.scrollbtn[href$="#workshops"]:first').addClass('active');
			$('.scrollbtn[href$="#panelists"]:first').removeClass('active');
			$('.scrollbtn[href$="#speakers"]:first').removeClass('active');
		} else if (wOffset >= $('#panelists').offset().top - $('.navbar').height() * 2 - 1) {
			$('.scrollbtn[href$="#panelists"]:first').addClass('active');
			$('.scrollbtn[href$="#workshops"]:first').removeClass('active');
			$('.scrollbtn[href$="#speakers"]:first').removeClass('active');
		} else if (wOffset >= $('#speakers').offset().top - $('.navbar').height() * 2 - 1) {
			$('.scrollbtn[href$="#speakers"]:first').addClass('active');
			$('.scrollbtn[href$="#panelists"]:first').removeClass('active');
			$('.scrollbtn[href$="#workshops"]:first').removeClass('active');
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
	      scrollTop: target.offset().top - $('.navbar').height() * 2
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
		$('#bioModal .bioname').html(people["name"]);
		$('#bioModal .bioimg').attr('src', people["pic"]);
		$('#bioModal .biodesc').html(people["bio"]);

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

		samantha: {
			name: 'Samantha Estoesta',
			pic: 'images/guests/Samantha.jpg',
			bio: 'Samantha Estoesta (she/her) is a multiple-published poet and long time #WomenInSTEM advocate. With an MA in Intercultural Communications and almost ten years in advocacy, communications, community development, community engagement, digital communications, digital design, and social media strategy, she centers her efforts on growing communities through reciprocal relationships. When she\'s not talking about being a brown female in tech, she can be found around town sharing her words, organizing others\' lives (semi-professionally!) or watching terrible Netflix shows.'
		},

		emily: {
			name: 'Emily Branton',
			pic: 'images/guests/Emily.jpg',
			bio: 'Emily became the President and part-owner of Link2Feed at only 24-years old.</br>In five years, she’s grown the company from a side project to an international business that has impacted nearly 3.3 million lives and been named one of B Corp’s “Best for the World” companies.</br>Her work has also been a launching pad for her travels, having visited 19 countries including 8 Canadian provinces and 23 US states.</br>Emily is a writer, speaker and yoga instructor who struggles to decide what she likes more- tea or red wine. She lives in Sarnia with her spouse and fellow Packer’s fan, Matt, and their black lab Clay (named after the great Clay Matthews).'
		},

		len: {
			name: 'Len Payne',
			pic: 'images/guests/LenPayne.jpg',
			bio: 'Len Payne is the Chief Technology Officer of Link2Feed, and he took the long road to get there. As an alumnus of UWindsor’s B.Ed. program (among several other things), Len spent the better part of a decade as a world-traveller, teacher, college professor and software developer before joining Link2Feed. Now, he leads a team of excited young developers as they help families and individuals break the cycle of poverty, one box of food at a time.'
		},

		dannyBoi: {
			name: 'Daniel Biafore',
			pic: 'images/guests/dannyBoi.jpg',
			bio: 'Daniel Biafore, IATF, PMP is an Entrepreneur who provides Management Consultant, Trainer and Auditing through Biafore Associates Inc. which he has been operating since 1997. Clients include Small, Medium and Large Organizations Original Equipment Manufacturers (OEM) within various industries such as: Transportation, (Auto, Construction, Ag), Technology, Commercial, Service, Food, Education, Chemical, Energy, Pulp & Paper, etc. <br><br>Dan\’s achievements include the development and implementation of full (30+) Business Management Systems (Quality / Environmental / Health &amp; Safety / Integrated), project management and product and process design and development projects, training and 1st , 2nd and 3rd party auditing for small, medium and large (Tier 1, Ford, Daimler- Chrysler, Harley-Davidson, Caterpillar, John Deer, Sara Lee, Domtar, Saskpower, LG, etc.) clients resulting in ~ multi million dollars in longer term prevention savings. <br><br>Dan has over 30+ years of experience working with Business Management Systems in various industries and languages including Quality Management positions with MultiNational Automotive Tier One Manufacturers as well as an Independent Entrepreneur (trainer, consultant, auditor) both domestically and Internationally (North America, Asia, Europe, Africa, etc.). Dan studied Mechanical Engineering and is a graduate of St. Clair College of Applied Arts and Technology, Windsor, ON. <br><br>Dan is an accredited IATF (Automotive) 3rd Party Auditor, Exemplar Global Quality (QMS) Master Lead Auditor, 3rd party registrar qualified Environmental (EMS) and Health & Safety (OHS) Auditor. He also holds a Program Management Professional (PMP) certification with the Project Management Institute (PMI).'
		},

		yvonne: {
			name: 'Yvonne Pilon',
			pic: 'images/guests/Yvonne.jpg',
			bio: 'Yvonne Pilon is a Millennial #GirlBoss and #WomenInTech. At the age of 24, she founded her first tech company, AD2IT, and by the age of 29, she became the youngest female to lead a Regional Innovation Centre in the Province of Ontario. Yvonne has over 10 years experience in the startup and tech space with a core focus on growing companies and building a thriving entrepreneurial community. Yvonne recently took her love for tech to the airwaves as Host of the ‘Tech In The City’ podcast where she likes to consider herself the Carrie Bradshaw of tech.'
		},

		alicia: {
			name: 'Alicia Jewell Bayi',
			pic: 'images/guests/BayiAlicia.jpg',
			bio: 'AliciaJewell (AJ) Bayi is a Business Analyst for Quicken Loans, the nation’s largest mortgage lender, which is based in Detroit, Michigan. [EK1] She has ten years of experience in planning technology classes for girls in middle and high school. AJ has impacted the lives of more than 400 girls by running a 3-year program funded by the National Science Foundation with a 1-million-dollar grant. While hosting a coding class on Saturdays for five years, many of her students went on to study technology or engineering in college. As an avid Games of Thrones fan, she is known as THE Mother of Three Teens, Delegator of Chores, Slayor of To-do Lists, Creator of Lactose-free Dishes, Commander of Yoga and Dance Fitness. You can read more about her interests, hobbies and recipes on her website at www.jewellbee.com and follow her on twitter @ jewellbee313.'
		},

		guava: {
			name: 'Gaurav Kumar Singh',
			pic: 'images/guests/GuavaJuice.jpg',
			bio: 'Gaurav brings expertise on emerging technologies like artificial intelligence and data science. He also dabbles in technical strategy and planning of autonomous vehicles (AV). Through speaking and panel gigs, he has shared platforms with prominent researchers and stakeholders of (AV) technology and expanded his network.'
		},
		hartford: {
			name: 'Patrick Hartford',
			pic: 'images/guests/Hartford.jpeg',
			bio: 'As VP of Emerging Technology, Patrick leads Quicken Loans’ usage and implementation of the latest industry standards, as well as drives the research, evangelism and implementation of new and emerging technologies.<br><br> Hartford’s involvement with the development of mortgage technology spans nearly twenty years. Patrick is a long-time contributor of technical and business expertise to the Mortgage Industry Standards Maintenance Organization (MISMO) and currently holds a seat on their Strategic Planning Committee. Patrick provides the mortgage industry with technical guidance as it relates to streamlining the IRS 4506 process and FHA electronic signature standards.<br><br> Hartford has also been recognized by Mortgage Banking magazine as one of the “MISMO All-Stars.”  He has also been a featured speaker at industry events such as the MBA Annual Convention and the MBA Technology show to provide conference attendees with technology guidance and knowledge of electronic and paperless mortgages.<br><br> Hartford received his Certified Mortgage Technologist (CMT) in 2005.'
		},
		dward: {
			name: 'Don Ward',
			pic: 'images/guests/DonWard.jpg',
			bio: 'Don Ward is currently a member of the Emerging Technology team at Quicken Loans responsible for evaluating and researching new techniques and technologies for Quicken Loans. An avid technologist, he enjoys hosting software developer events as well as networking within the local software development community. As part of his goal to help promote software development in the local area, he currently leads both the Detroit and Windsor Google Developer Group chapters.'
		},
		hong: {
			name: 'Kenny Hong',
			pic: 'images/guests/hongmeister.jpg',
			bio: 'Kenny Hong is a GitHub Campus Expert and a M.Sc student at the University of Manitoba. He has spent most of his undergraduate building inclusive communities where students are able to learn different aspects of Computer Science together. In 2014, Kenny started a student group focused on exploring these different aspects. What was once a small group of 10 people, has now become a big community offline and online, with over 100 students as well as alumni from a variety of disciplines on the network. He has also served has a Head Delegate, Director of Sponsorship, Co-Chair, and Advisor for the Canadian University Software Engineering Conference in Montreal, QC.<br><br>Nowadays, he is focused on completing his thesis, as well as sharing his experience with as many people as he can. During his free time, he sings in a choir called Prairie Voices and spends his time sometimes streaming on Twitch but mainly helping other streamer communities grow!'
		},
		nutty: {
			name: 'Almond Au',
			pic: 'images/guests/Almond.jpg',
			bio: 'Almond works with Google Cloud clients & partners to design and scale applications in the cloud. He has also helped deliver a number of technical events with Google like Code Jam (Google\'s coding competition) and Google Cloud Relay - a coast to coast Canadian cloud hackathon. With over 10 years of technical experience prior to Google, Almond held senior systems engineering roles at Commvault and Seagate, and held a number of technical roles at IBM where he worked in data center architecture, databases, and networking. Almond holds a Master of Engineering and Bachelor of Science degrees from Ryerson University in Toronto.'
		},
		esports: {
			name: 'Sten Dragoti',
			pic: 'images/guests/esports_dude.JPG',
			bio: 'Industry veteran and entrepreneur with an extensive career history in esports. Sten has dedicated over 7 years building renowned esports events through his company, EGE, which was later acquired for the purpose of creating the first collegiate esports program in Canada. Sten has a diverse skill set in marketing, business management, event logistics, and broadcast production.'
		},
		castle: {
			name: 'Adam Castle',
			pic: 'images/guests/AdamCastle.jpg',
			bio: 'Adam Castle has spent the last 7 years working passionately the Windsor-Essex Economic Development Ecosystem, specializing in business development and growth across multiple sectors with companies of all sizes. Adam is a highly driven Business Advisor with a proven track record and has assisted hundreds of ventures in the Windsor-Essex and Chatham-Kent regions. With a background in sociology and psychology, Adam is also an entrepreneur of 15 years and has a strong foundation in leadership, having grown his own company to 65 employees, and launching one of Southern Ontario’s first Social Media platforms.'
		},
		alyssa: {
			name: 'Alyssa Boucher',
			pic: 'images/guests/Alyssa.jpg',
			bio: 'Alyssa Boucher is a University Relations Manager with Quicken Loans focusing on attracting and engaging a diverse pipeline of talent to the family of companies. Before joining Quicken Loans in November of 2016, Alyssa graduated with a Business Management Degree from Lake Superior State University and worked in Automotive Recruiting.  In her time at Quicken Loans, she has been essential to the Talent Acquisition team growing from Associate Recruiter to Campus Recruiter, to her current role as a University Relations Manager. As a University Relations Manager, she builds relationships with the Windsor Essex Community, Michigan State University, Western Michigan University, and the Student-Athlete population. With over three years of recruiting experience, Alyssa works with universities in developing high-level talent, helping students understand their potential within our companies, and assisting the business in understanding the university talent market. Outside of work, you can find Alyssa hopping around Downtown Detroit, trying all the new restaurants.'
		},
		jakub: {
			name: 'Jakub Koter',
			pic: 'images/guests/Jakub.jpg',
			bio: 'I\'ve been an entrepreneur, designer and a developer as long as I remember. It all started in my birthplace Poland when I formed a lottery in grade 4 where I would sell tickets to my fellow classmates and do a draw once a week. School found out what I was doing and that was the end of that. But I was hooked.<br><br> I\'ve always tried to stay on the cutting edge of technologies and design trends, and have extensive knowledge of iPhone/Mobile development, web and sound design.<br><br> In 2009 I created app (when only few knew what an app was) called MindWave, which has been top paid app in USA, Canada, Japan, Italy, etc.<br><br> In Dec. 2009 I started Red Piston Inc with two partners after BBDO Windsor closed it\'s doors. Red Piston has a simple mission. Deliver user friendly, innovative and successful iPhone/mobile applications. We design, develop and integrate mobile apps, games and innovative interactive experiences. Read more at <a href="https://www.linkedin.com/in/jakub-koter-a932a216/" target="_blank">https://www.linkedin.com/in/jakub-koter-a932a216/.</a>'
		},
		janssen: {
			name: 'Justine Janssen',
			pic: 'images/guests/Janssen-Justine.jpg',
			bio: 'Justine is Senior Vice President of Strategy at Ceridian where she leads the design, prioritization, and execution of the organization’s most critical growth and strategic programs. Justine has helped scale Dayforce from a tech startup, through a merger with Ceridian, growing it into a leading human capital management platform. These transformational efforts have included product and program launches, and leading culture change and business simplification efforts to turn Ceridian into a high-growth tech company. Justine recently led Ceridian’s 2018 IPO, which raised over CAD $800 million and marked the largest technology IPO ever in Canada. Justine has been recognized as one of Canada\'s Top 40 Under 40, one of the Top 25 Canadian Women in Tech, and as a Woman of Excellence Award for Achievement in Business. Outside of Ceridian, Justine is co-founder of Shelle Maternity, a maternity activewear company, serves on the boards of Entergrus Powerlines Inc, Ceridian Cares, and WETech Alliance, and is an advisor to organizations advancing women in STEM, #movethedial and Build a Dream.'
		},
		suthan: {
			name: 'Suthan Theiven',
			pic: 'images/guests/Suthan.jpeg',
			bio: 'Suthan is a former management consultant turned business strategist and product manager. He has helped companies across North America in crafting business strategies and commercializing products and services, including HP, Deutsche Telekom, Tier-1 automotive supplier, leading Canadian telcos, and banking clients. Currently, he helps Green Shield Canada with business strategy development for their Benefits Management group and leading corporate innovation delivery and digital transformation.'
		},
		kopsala: {
			name: 'Eric Kopsala',
			pic: 'images/guests/Kopsala.jpg',
			bio: 'Eric is the current director of architecture for Green Shield Canada, responsible for guiding the architecture of the organization as it undertakes a multi-year transformation journey. He has led IT architecture teams in various domains including data, application, security and solution architecture through multiple roles in the Insurance and Financial Services Industries. He has extensive experience in evaluating architectures and technologies in support of business strategy, and driving corporate value. Eric enjoys the softer-side of technology and is passionate about teamwork and getting the most out of people.'
		}
	}

});
