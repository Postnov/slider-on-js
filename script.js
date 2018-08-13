;document.addEventListener('DOMContentLoaded', function() {

	var slider = document.querySelector('.dp-slider'),
		wrapper = document.querySelector('.dp-slider__wrapper'),
		slides = slider.querySelectorAll('.dp-slide'),
		slideWidth = 0,
		windowWidth = document.body.clientWidth,
		slidePerPage = 3,
		dots = document.querySelector('.dots'),
		prevBtn = document.querySelector('.prev'),
		nextBtn = document.querySelector('.next'),
		translateWidth = windowWidth / slidePerPage,
		initialTranslate = 0;


	//Set width slide and add button in dots list
	slides.forEach(function(item, i) {
		item.style.width = (windowWidth / slidePerPage) + 'px';
		var btn = document.createElement('button');
		btn.innerText =  ++i;
		dots.appendChild(btn);
	});

	slides.forEach(function(item) {
		slideWidth += item.clientWidth;
	});


	slider.style.width = slideWidth + 'px';

	/* Next Arrow */

	nextBtn.addEventListener('click', function () {
		if (initialTranslate < slideWidth - translateWidth) {
			initialTranslate += translateWidth;
			wrapper.style.transform = "translateX(-"+ initialTranslate + "px)";
		}
	});


	/* Prev Arrow */

	prevBtn.addEventListener('click', function () {
		if (initialTranslate.toFixed() === translateWidth.toFixed() ) {
			wrapper.style.transform = "translateX(0px)";
			initialTranslate -= translateWidth;
		}else {
			initialTranslate -= translateWidth;
			wrapper.style.transform = "translateX(-"+ initialTranslate + "px)";
		}
	});



	/* Dots Translate */
	document.querySelectorAll('.dots button').forEach(function(item) {
		item.addEventListener('click', function() {
			var translateDot = this.innerText * translateWidth;
			translateDot -= translateWidth;
			if (translateDot > slider.style.width) {
				wrapper.style.transform = "translateX(-"+ slider.style.width  + "px)";
			}else {
				wrapper.style.transform = "translateX(-"+ translateDot + "px)";
			}

			initialTranslate = translateDot;

		});
	});

});