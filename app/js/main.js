new Glider(document.querySelector('.hero-slider__wrap'), {
	slidesToShow: 1,
	rewind: true,
	draggable: true,
	dots: '.hero-dots',
	arrows: {
		prev: '.hero-slider-arrows__left',
		next: '.hero-slider-arrows__right'
	},
	responsive: [
		{
		  // screens greater than >= 775px
		  breakpoint: 1024,
		  settings: {
			draggable: false,
		  }
		}
	  ]
});

window.addEventListener('load', function () {
	new Glider(document.querySelector('.review-slider__wrap'), {
		slidesToShow: 1,
  		slidesToScroll: 1,
  		scrollLock: true,
  		dots: '.review-dots',
		draggable: true,
		arrows: {
			prev: '.review-item__arrows-left',
			next: '.review-item__arrows-right'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				draggable: false,
				dots: '.review-dots',
				rewind: true
			  }
			}
		  ]
	});
	new Glider(document.querySelector('.clients-slider__wrap'), {
		slidesToShow: 3,
		slidesToScroll: 1,
		draggable: true,
		arrows: {
			prev: '.clients-item__arrows-left',
			next: '.clients-item__arrows-right'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 768,
			  settings: {
				slidesToShow: 6,
				draggable: false,
				autoplay: true,
				rewind: true
			  }
			},
			{
				// // screens greater than >= 1024px
				// breakpoint: 1024,
				// settings: {
				//   slidesToShow: 6
				// }
			}
		  ]
	});
});