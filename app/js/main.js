new Glider(document.querySelector('.hero-slider__wrap'), {
	slidesToShow: 1,
	draggable: true,
	rewind: true,
	arrows: {
		prev: '.hero-slider__arrows-left',
		next: '.hero-slider__arrows-right'
	}
});

window.addEventListener('load', function () {
	new Glider(document.querySelector('.review-slider__wrap'), {
		slidesToShow: 2,
		draggable: true,
		rewind: true,
		arrows: {
			prev: '.review-item__arrows-left',
			next: '.review-item__arrows-right'
		}
	});
	new Glider(document.querySelector('.clients-slider__wrap'), {
		slidesToShow: 6,
		draggable: true,
		rewind: true,
		arrows: {
			prev: '.clients-item__arrows-left',
			next: '.clients-item__arrows-right'
		}
	});
})