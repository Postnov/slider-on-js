;document.addEventListener('DOMContentLoaded', function() {

	function DPSlider (selector, options) {
		this.selector = document.querySelector(selector) || document.querySelector('.dp-slider');
		this.options  = options || {};

		var slider           = this.selector,
			sliderOldContent = this.selector.innerHTML,
			sliderNewContent = '<div class="dp-slider__wrapper">' + sliderOldContent + '</div>';

		this.selector.innerHTML = sliderNewContent;


		var wrapperSlider    = slider.querySelector('.dp-slider__wrapper'),
			slides		     = wrapperSlider.children;
			slideWidth       = 0,
			windowWidth      = document.body.clientWidth,

			//opitons
			slidePerPage     = options.sliderPerPage || 5,
			dots 		     = options.dots || false,
			nav		         = options.nav || false,
			navSpeed         = options.navSpeed || false,

			translateWidth   = windowWidth / slidePerPage,
		    initialTranslate = 0;
		    


		for (var i = 0; i < slides.length; i++) {

			//get item width
			slides[i].style.width = (windowWidth / slidePerPage) + 'px';

			//sliderWidth
			slideWidth += parseFloat(slides[i].style.width);
		}

		wrapperSlider.style.width = slideWidth + 'px';



		if (dots === true) {
			var dotsEl = document.createElement('div');
			dotsEl.classList.add('dp-slider__dots');

			for (var s = 0; s < slides.length;) {
				//add dots
				var dotsBtn = document.createElement('button');
				dotsBtn.innerText = ++s;
				dotsEl.appendChild(dotsBtn);
			}			

			slider.appendChild(dotsEl);

			/* Dots Translate */
			slider.querySelectorAll('.dp-slider__dots button').forEach(function(item) {
				item.addEventListener('click', function() {
					var translateDot = this.innerText * translateWidth;
					translateDot -= translateWidth;
					if (translateDot > wrapperSlider.style.width) {
						wrapperSlider.style.transform = "translateX(-"+ wrapperSlider.style.width +")";
					}else {
						wrapperSlider.style.transform = "translateX(-"+ translateDot + "px)";
					}

					initialTranslate = translateDot;
				});
			});			
		}

		if (nav === true) {
			var navEl = document.createElement('div'),
				prevEl  = document.createElement('button'),
				nextEl  = document.createElement('button');
			
			navEl.classList.add('dp-slider__nav');
			prevEl.classList.add('dp-slider__prev');
			nextEl.classList.add('dp-slider__next');

			prevEl.innerHTML = 'prev';
			nextEl.innerHTML = 'next';

			navEl.appendChild(prevEl);
			navEl.appendChild(nextEl);
			slider.appendChild(navEl);


			nextEl.addEventListener('click', function () {
				if (parseFloat(wrapperSlider.style.width) - translateWidth >= initialTranslate.toFixed()) {
					initialTranslate += translateWidth;
					wrapperSlider.style.transform = "translateX(-"+ initialTranslate + "px)";
				}
			});			

			prevEl.addEventListener('click', function () {
				if (initialTranslate.toFixed() === translateWidth.toFixed()) {
					wrapperSlider.style.transform = "translateX(0px)";
					initialTranslate = 0;
				}else {
					if (initialTranslate > 0) initialTranslate -= translateWidth;
					wrapperSlider.style.transform = "translateX(-"+ initialTranslate + "px)";
				}
			});			
		}



	};// end constructor



	var slider = new DPSlider('.dp-slider', {
		nav: true,
		dots: true,
		slidePerPage: 10
	})

	var slider2 = new DPSlider('.test-slider', {
		nav: true,
		dots: true,
		slidePerPage: 2
	})



});