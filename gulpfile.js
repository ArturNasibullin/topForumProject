var gulp      		= require('gulp'), // Подключаем Gulp
	sass         	= require('gulp-sass'), //Подключаем Sass пакет
	sourcemaps 		= require('gulp-sourcemaps'),
	concat       	= require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	babel 			= require('gulp-babel'), // Подключаем Babel
	uglify       	= require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
	browserSync 	= require('browser-sync'), // Подключаем Browser Sync
	imagemin     	= require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     	= require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    del         	= require('del'), // Подключаем библиотеку для удаления файлов и папок
	cache       	= require('gulp-cache'), // Подключаем библиотеку кеширования
	rename 			= require('gulp-rename'), //Подключаем бибилиотеку для переименования файлов
	webp 			= require('gulp-webp'),
	autoprefixer 	= require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
	
	

gulp.task('browser-sync', function() { // Создаем таск browser-sync
		browserSync({ // Выполняем browser Sync
			server: { // Определяем параметры сервера
				baseDir: 'app' // Директория для сервера - app
			},
			notify: false // Отключаем уведомления
		});
	});

gulp.task('sass', function() { // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass :nested :compact :expanded :compressed
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(sourcemaps.write('.'))   // создание карты css.map в текущей папке
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('webp', function() {
	return gulp.src([ //
		'app/img/**/*.jpg',  
		'app/img/**/*.jpeg',  
		'app/img/**/*.png'
		])
	  .pipe(webp({quality: 90}))
	  .pipe(gulp.dest('app/img/web-p'));
});

gulp.task('libs-js', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/js/libs/jquery.min.js',  // Берем jQuery
		'app/js/libs/jquery.waypoints.js',
		'app/js/libs/parallaxie.js',
		'app/js/libs/photoswipe.min.js',
		'app/js/libs/photoswipe-ui-default.min.js',
		'app/js/libs/typeit.min.js'
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});
gulp.task('libs-css', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/css/libs/bootstrap-grid.min.css',  // Берем bootstrap
		'app/css/libs/animate.min.css'
		])
		.pipe(concat('libs.css')) // Собираем их в кучу в новом файле libs.css
		.pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
		.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});


gulp.task('babel', function () {
    return gulp.src([
        'app/js/main.js'
    ])
    .pipe(babel({
        presets: ["@babel/preset-env"]
	}))
	// .pipe(uglify()) // Сжимаем JS файл
	.pipe(rename('main-min.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', function() {
	return gulp.src('app/js/main.js')
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});


gulp.task('prebuild', async function() {
    var buildCss = gulp.src(['app/css/**/*']) // Переносим стили css в продакшен
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'));
    
    var buildJs = gulp.src(['app/js/**/*']) // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'));
    
    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
	
	var buildImg = gulp.src('app/img/**/*') // Переносим картинки в продакшен
	.pipe(gulp.dest('dist/img'));
    
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
	gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	// gulp.watch(['app/js/main.js', 'app/js/libs.js'], gulp.parallel('script')); // Наблюдение за главным JS файлом и за библиотеками
	gulp.watch('app/js/main.js', gulp.parallel('script')); // Наблюдение за главным JS файлом
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch', 'script'));
gulp.task('build', gulp.parallel('clean','prebuild', 'img', 'sass', 'webp'));



