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

	// slider
	new Glider(document.querySelector('.review-slider__wrap'), {
		slidesToShow: 1,
  		slidesToScroll: 1,
  		scrollLock: true,
  		dots: '.review-dots',
		draggable: true,
		arrows: {
			prev: '.review-slider-arrows__left',
			next: '.review-slider-arrows__right'
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
		  ]
	});

	//Кнопка menu
	let btn = document.querySelector('.header-top-line__burger-btn');
	let menu = document.querySelector('.header-top-line-menu');
	let subMenu = document.querySelectorAll('.header-top-line-submenu');
	let menuItem = document.querySelectorAll('.header-top-line-submenu__link');
	
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		menu.classList.toggle('active');
		menu.style.opacity = 1;
		btn.classList.toggle('active');
		subMenu.forEach(link => {
			link.style.display = 'flex';
		});

		menuItem.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				btn.classList.remove('active');
				menu.classList.remove('active');
				menu.style.opacity = 0;
				subMenu.forEach(link => {
					link.style.display = 'none';
				});
			});
		});
		//Блокировать прокрутку экрана при активном Меню
		// if (menu.classList.contains('active')) {
		// 	document.body.style.overflow = 'hidden';
		// } else {
		// 	document.body.style.overflow = '';
		// }
	});
});