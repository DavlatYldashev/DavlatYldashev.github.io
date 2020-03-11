// Ad modules
var gulp        = require('gulp'), // Подключаем Gulp
    less        = require('gulp-less'), //Подключаем less пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
    autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку автопрефиксера

// Gulp tasks

// 1) Компиляция less в css
gulp.task('less', function(){ // Создаем таск less
    return gulp.src('app/less/**/*.less') // Берем источник
        .pipe(less()) // Преобразуем less в CSS посредством gulp-less
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

// 2) Лайф-релоад
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        browser: 'chrome', // Браузер при запуске
        notify: false // Отключаем уведомления
    });
});

// 3) Обработка JS
gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

// 4) Обработка HTML
gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

// 5) Обработка библиотек JS. Конкатенация и сжатие.
gulp.task('libs', function() {
    return gulp.src('app/js/libs/**/*.js')
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

// 6) Обработка CSS файлов. Конкатенация и сжатие.
gulp.task('css-libs', function() {
    return gulp.src('app/css/libs/**/*.css') // Выбираем файл для минификации
        .pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.css
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// 7) Удаление папки DIST перед финальной сборкой
gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// 8) Наблюдение за html, js, css файлами
gulp.task('watch', function() {
    gulp.watch('app/less/**/*.less', gulp.parallel('less')); // Наблюдение за less файлами
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за JS файлами
    gulp.watch(['app/index.html', 'app/**/*.html'], gulp.parallel('code')); // Наблюдение за HTML файлами
});

// 9) Очистка кэша
gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('default', gulp.parallel( 'css-libs','less', 'browser-sync', 'watch', 'libs' ));

// СБОРКА В ПРОДАКШН
gulp.task('build', async function() {
	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/*.js') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
});

