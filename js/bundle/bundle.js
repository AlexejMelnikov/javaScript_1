(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

window.addEventListener("DOMContentLoaded", () => {

	let tab = require('../parts/tab.js');
	let ajax = require('../parts/ajax.js');
	let calc = require('../parts/calc.js');
	let modal = require('../parts/modal.js');
    //let scrol = require('../parts/scrol.js');
	let slider = require('../parts/slider.js');
	let timer = require('../parts/timer.js');

	tab();
	ajax();
	calc();
	modal();
	//scrol();
	slider();
	timer();

});


	

		



},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/slider.js":5,"../parts/tab.js":6,"../parts/timer.js":7}],2:[function(require,module,exports){
function ajax() {
	let form =document.getElementsByClassName('main-form')[0],
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

		statusMessage.classList.add('status');

		form.addEventListener('submit', function(event) {
			event.preventDefault();
			form.appendChild(statusMessage);


			// AJAX
			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			 request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");

			 let formData = new  FormData(form);
			 // отправка запроса
			 request.send(formData);
			 let image = document.createElement('img');
			 statusMessage.appendChild(image);
			 

			 request.onreadystatechange = function() {
			 	if(request.readyState < 4) {
			 		image.src = "gif/ajax-loader.svg";
			 				
			 	} else if(request.readyState === 4){
			 		// console.log(request.readyState+"  "+request.status);
			 			if(request.status === 200 && request.status < 300) {
			 					image.src = "gif/success1.png";
											 								 					
			 					} else {

			 						image.src = "gif/failure.jpg";
			 			}
			 		}
			 	}
			 	console.log(request.readyState);
			  for(let i = 0; i < input.length; i++) {
			 	input[i].value = "";
			 }
		});

// ajax запрос контактной формы
let contact_form =document.getElementById('form'),
		inputs = contact_form.getElementsByTagName('input'),
		statusMessages = document.createElement('div');

		statusMessages.classList.add('status');

		contact_form.addEventListener('submit', function(event) {
			event.preventDefault();


			contact_form.appendChild(statusMessages);
			// AJAX
			let request = new XMLHttpRequest();
			// настройка запроса
			request.open('POST', 'server.php');

			 request.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");

			 let formData = new  FormData(contact_form);
			 request.send(formData);

			 request.onreadystatechange = function() {
			 	if(request.readyState < 4) {

			 		// statusMessages.innerHTML = message.loading;
			 		image.src = "gif/ajax-loader.svg";

			 	} else if(request.readyState === 4){
			 			if(request.status === 200 && request.status < 300) {

			 					// statusMessages.innerHTML = message.succes;
			 					image.src = "gif/success1.png";
			 					// добавляем данные
			 					} else {
			 						// statusMessages.innerHTML = message.failure;
			 						image.src = "gif/failure.jpg";
			 			}
			 		}
			 	}
			  for(let i = 0; i < inputs.length; i++) {
			 	inputs[i].value = "";
			 }
		});
}
module.exports = ajax;
},{}],3:[function(require,module,exports){
function calc() {
			  let persons = document.getElementsByClassName('counter-block-input')[0],
		   restDays = document.getElementsByClassName('counter-block-input')[1],
		   totalValue = document.getElementById('total'),
		   place = document.getElementById('select'),
		   personsSumm = 0,
		   daysSum = 0,
		   total = 0;


		   totalValue.innerHTML = 0;
		   persons.addEventListener('input', function() {
		   		let inp = parseInt(persons.value, 10);
		   		personsSumm =+ inp;
		   		let regExp = new RegExp(/\d+/g);
		    		
		    	
		    		if((inp+"").indexOf('e') || !!((persons.value+"").match(regExp))) {
		    			totalValue.innerHTML = 0;	
		   }
		   		total = (daysSum + personsSumm)* 4000;
		   		if(persons.value == "" || restDays.value == "") {
		   			totalValue.innerHTML = 0;
		   		} else {
		   			totalValue.innerHTML = total;
		   		}
		   		
		
		});
		    restDays.addEventListener('input', function() {
		    	(restDays.value == NaN)? total = 0:total = total;
		    	let regExp = new RegExp(/\d+/g),
		    		inp = parseInt(restDays.value, 10);
		    		if((inp+"").indexOf('e') || !!((restDays.value+"").match(regExp))) {
		    			totalValue.innerHTML = 0;	
		    			// console.log(restDays.value);
		    		}
		    		console.log((restDays.value+"").match(regExp))
		    	daysSum =+ inp; //this.value
		   		total = (daysSum + personsSumm)* 4000;
		   		if(persons.value == "" || restDays.value == "") {
		   			totalValue.innerHTML = 0;
		   		} else {
		   		totalValue.innerHTML = total;
		   		}

		   });
		    place.addEventListener('change', function() {
		    	(place.value == NaN)? total = 0:total = total;
		    		if(persons.value == "" || restDays.value == "") {
		    			totalValue.innerHTML = 0;
		    		} else {
		    			let a = total;
		    			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		    		}
		    		let regExp = new RegExp("/\+|\d{1,}|\.|\,|\e|/",g);
		    		console.log((restDays.value).match(regExp));
		    });

}
module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	let more = document.querySelector('.more'),
	    overlay = document.querySelector('.overlay'),
	    close = document.querySelector('.popup-close'),
	    btnDesc = document.querySelectorAll('.description-btn');
	 

	    more.addEventListener('click', () => {
	    	console.log(more);
	    	more.classList.add('more-splash');
	    	overlay.style.display = 'block';
	    	document.body.style.overflow = 'hidden';
	    });
	    for(let i = 0; i < btnDesc.length; i++) {
	    btnDesc[i].addEventListener('click', () => {
	    	btnDesc[i].classList.add('more-splash');
	    	overlay.style.display = 'block';
	    	document.body.style.overflow = 'hidden';
	      });
	}
	   close.addEventListener('click', () => {
	   		overlay.style.display = 'none';
	   		more.classList.remove('more-splash');
	   		document.body.style.overflow = '';
	   });
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function slider() {
	 let slideIndex = 1,
		 		slides = document.getElementsByClassName('slider-item'),
		 		prev = document.querySelector('.prev'),
		 		next= document.querySelector('.next'),
		 		dotsWrap = document.querySelector('.slider-dots'),
		 		dots = document.getElementsByClassName('dot');

		 			showSlides(slideIndex);
		 function showSlides(n) {

		 		if (n > slides.length) {
		 			slideIndex = 1;
		 		}
		 		if (n < 1) {
		 			slideIndex = slides.length;
		 		}
		 		for(let i = 0; i < slides.length; i++) {
		 			slides[i].style.display = 'none';
		 		};
		 		for (let i=0; i < dots.length; i++) {
		 			dots[i].classList.remove('dot-active');
		 			};
		 			slides[slideIndex -1].style.display = 'block';
		 			dots[slideIndex -1].classList.add('dot-active');
		 			
		 }
		 function plusSlides(n) {
		 	showSlides(slideIndex +=n)
		 }
		 function currentSlie(n) {
		 	showSlides(slideIndex =n)
		}		 
		 prev.addEventListener('click', function(){
		 	plusSlides(-1);
		 });
		  next.addEventListener('click', function(){
		 	plusSlides(1);
		 });
		  dotsWrap.addEventListener('click', function(event) {
		  	for(let k = 0; k < dots.length + 1; k++) {
		  		if(event.target.classList.contains('dot') && event.target == dots[k -1]) {
		  			currentSlie(k); 
		  			}
		  	console.log(dots[k]);				  	}
		  });
		
}
module.exports = slider;
},{}],6:[function(require,module,exports){
function tab() {
	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];

	let hideTabContent = (a) => {

		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');

		}

	}
	hideTabContent(1);

let showTabContent = (b) => {
	if(tabContent[b].classList.contains('hide')) {
		hideTabContent(0);
		tabContent[b].classList.remove('hide');
		tabContent[b].classList.add('show');
	}
}
	info.addEventListener('click', (event) => {
		let target = event.target;
		if(target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		};
	})
	
}
module.exports = tab;
},{}],7:[function(require,module,exports){
function timer() {
	let deadLine = '2018-08-31';
	
	
	let geTimeRemainig = (endTime) => {
		let t = Date.parse(endTime) - Date.parse(new Date());
			(t < 0)? t = 0 : t = t;
		let seconds = Math.floor( (t/1000) % 60 ),
			minutes = Math.floor( (t/1000/60) % 60 ),
			hours = Math.floor( t/(1000*60*60));
		

			return {
						'total': t,
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds	
			};
	};
let setClock = (id, endtime) => {

	let timer = document.getElementById(id),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds');
let checkTime = (a) => {
	 	(a < 10)? a = "0"+a : a = a ;

	 return a;
	 	};

	 	

		let updateClock = () => {
			let t = geTimeRemainig(endtime);
			hours.innerHTML = checkTime(t.hours);
			minutes.innerHTML = checkTime(t.minutes);
			seconds.innerHTML = checkTime(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		};
		updateClock();

		var timeInterval = setInterval(updateClock, 1000);
	};
	setClock('timer', deadLine);

}
module.exports = timer;
},{}]},{},[1]);
