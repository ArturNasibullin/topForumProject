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
});