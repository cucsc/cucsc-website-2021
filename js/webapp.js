
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

	//get auto filled ticket number
	function querys(){
		urlTemp = window.location.search.substring(1);
		autoSearch = urlTemp.split("=");
		return autoSearch[1];
	}
	
	// Your web app's Firebase configuration
	//if you are from the cucsc2020 team this will need to change
	var firebaseConfig = {
		apiKey: "AIzaSyCKMU_Mb_1zF-1Q31F-zlbTUalkfTg-iN0",
		authDomain: "cucscwebapp.firebaseapp.com",
		databaseURL: "https://cucscwebapp.firebaseio.com",
		projectId: "cucscwebapp",
		storageBucket: "",
		messagingSenderId: "1060532170632",
		appId: "1:1060532170632:web:b97d64c54ec05dab"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	var db = firebase.firestore();
	  

	//make the entered search into Title Case 
	//shamelessly stolen from stack overflow
	function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

	//check if the most recent search has already been searched
	function checkDuplicate(search){
		var sNum = JSON.parse(localStorage.getItem('searchNum'));
		if(sNum == null){
			return false;
		}
		else{
			//loop for number of searches (1 behind current number of searches)
			for(var i=1; i<=sNum.num; i++){
				var kvName = String('historyObject'+i);
				var historyObject = JSON.parse(localStorage.getItem(kvName));
				console.log(historyObject)
				//check if the current search is the same as any previous, return true
				if(historyObject.firstName == search.firstName && historyObject.lastName == search.lastName){
					return true;
				}
				//console.log(historyString);
			}
		}
		//no matching previous searches
		return false;
	}

	//save number of successful non duplicate searches
	function addSearchNum(){
		//first search
		if(JSON.parse(localStorage.getItem('searchNum')) == null){
			sNum = {num: 1};
		}
		//if entries already exists
		else{
			var sNum = JSON.parse(localStorage.getItem('searchNum'));
			sNum.num = sNum.num+1;
		}
		//set in storage again
		localStorage.setItem('searchNum', JSON.stringify(sNum));
	}

	//add the new to search to the localStorage search history
	//pull from local storage the entire history, add the delimiter $$ then search result, push to local storage
	function addHistory(search){
		//if there is no duplicate search history add recent search to history
		if(!checkDuplicate(search)){
			addSearchNum();
			var sNum = JSON.parse(localStorage.getItem('searchNum'))
			//name of localStorage access
			kvName = String('historyObject'+sNum.num);
			//set most recent search in local storage as 'historyObject+NumSearch'
			localStorage.setItem(kvName, JSON.stringify(search));
		}
	}

	//create html code for history entry
	function createAccordian(historyObject, i){
		const div = document.createElement('div');
		div.className = "card";
		var sAccord = "<div class=\"card-header\"><a class=\"card-link\" data-toggle=\"collapse\" href=\"#collapse"+i+"\">";
		sAccord = sAccord+historyObject.firstName+" "+historyObject.lastName+"</a></div>";
		sAccord = sAccord+"<div id=\"collapse"+i+"\" class=\"collapse\" data-parent=\"#accordion\"><div class=\"card-body\">";
		sAccord = sAccord+"<p id=\"waResult\">"+displayQuery(historyObject, true)+"</p></div></div></div>";
		div.innerHTML = sAccord;
		document.getElementById('accordion').appendChild(div);
	}

	//display the search history
	function displayHistory(){
		var sNum = JSON.parse(localStorage.getItem('searchNum'));
		console.log(sNum);
		if(sNum != null){
			//loop for number of searches
			for(var i=1; i<=sNum.num; i++){
				var kvName = String('historyObject'+i);
				var historyObject = JSON.parse(localStorage.getItem(kvName));
				createAccordian(historyObject, i);
			}
		}
		document.getElementById("waHistoryLabel").innerHTML = "<u>Search History</u>"
	}

	//if user gets to page by url alone (qr code) trigger form submit handler function
	if(typeof(querys()) != 'undefined'){
		ticketnum = querys();
		//reference to location in users
		var docRef = db.collection("users").doc(ticketnum);
		//get from that reference
		docRef.get().then(function(doc) {
			if (doc.exists) {
				//data from firestore
				console.log("Document data:", doc.data());
			} else {
				//doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
		//clear saved object to avoid loaidng 2 tickets at once (qr code then search)
		sessionStorage.setItem('saveObject', null);
	}
	//localStorage.clear();
	//entire Form (handler) if user searches
	$('#form1').submit(function(event) {
		var $form = $(this);
		event.preventDefault();
		console.log("submitting to firebase");
		//get ticket number entered
		ticketnum = $('#waInput').val();
		ticketnum = toTitleCase(ticketnum);
		console.log(ticketnum);
		//reference to location in users
		var docRef = db.collection("users").doc(ticketnum);
		var saveObject = null;
		//get from that reference
		docRef.get().then(function(doc) {
			if (doc.exists) {
				//console.log("Document data:", doc.data());
				saveObject = doc.data();
				//put the object into storage
				sessionStorage.setItem('saveObject', JSON.stringify(saveObject));
				//addSearchNum();
				addHistory(saveObject);
				//remove after "?" if the user used a qr code then searches
				window.location.href =  window.location.href.split("?")[0];
				//reload page forcibly
				setTimeout(function(){window.location.reload(true);},500);
			} else {
				//doc.data() will be undefined in this case
				document.getElementById('waResLabel').innerHTML = "<u>Attendee not found!</u><br>Make sure there is a space between the First and Last name."
				//localStorage.setItem('saveObject', null);
				document.getElementById('waResult').innerHTML = "";
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	})

	//display the retrieved object inside an HTML <p> tag
	function displayQuery(pastSearch, accord){
		//inner HTML paragraph string
		var showString;
		//all possible keys
		var keys = ["firstName", "lastName", "email", "phone", "city", "postSecondary", "work", "occupation"];
		//loop through each key element
		for(var i=0;i<keys.length;i++){
			var currKey = keys[i];
			//if the key had a value for attendee
			if(currKey in pastSearch){
				//for each key case
				switch(i){
					case 0:
						showString = String("<i>First Name: &nbsp;</i>"); break;
					case 1:
						showString = String(showString+"<i>Last Name: &nbsp;</i>"); break;
					case 2:
						showString = String(showString+"<i>Email: &nbsp;</i>"); break;
					case 3:
						break;
					case 4:
						showString = String(showString+"<i>City: &nbsp;</i>"); break;
					case 5:
						showString = String(showString+"<i>Post Secondary: &nbsp;</i>"); break;
					case 6:
						showString = String(showString+"<i>Currenty Employed at &nbsp;</i>"); break;
					case 7:
						showString = String(showString+"<i>Current Occupation is &nbsp;</i>"); break;
				}
				//add the value from database
				if(i != 3){
					showString = String(showString+pastSearch[currKey]+"<br>");
				}
				
			}
		}
		if(!accord){
			showString = String(showString+"<small>(Search will be saved in history below)</small>");
			document.getElementById('waResLabel').innerHTML = "<u>Attendee Information</u>"
		}
		return showString;
	}

	displayHistory()
	//retrieve the object from storage to display after submit reload
	var retrievedObject = sessionStorage.getItem('saveObject');
	if(retrievedObject != null){
		//display searched attendee's information
		document.getElementById('waResult').innerHTML = displayQuery(JSON.parse(retrievedObject), false);
	}
	

});

//scan qr code again big props to Lazar Laszlo for making this scanner
function openQRCamera(node) {
	var reader = new FileReader();
	reader.onload = function() {
		node.value = "";
		qrcode.callback = function(res) {
		if(res instanceof Error) {
			alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
		} else {
			//node.parentNode.previousElementSibling.value = res;
			document.getElementById('waInput').value = res;
		}
		};
		qrcode.decode(reader.result);
	};
	reader.readAsDataURL(node.files[0]);
}
