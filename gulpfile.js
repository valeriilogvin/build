let gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    watch        = require("gulp-watch"),
    rigger       = require("gulp-rigger"),
    preFixer     = require("gulp-autoprefixer"),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    reload       = browserSync.reload;

// let projectName = 'outlife-circular-menu';

// пути к файлам
var path = {

    build: {  // куда будет складывать готовые файлы после зборки
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        jslibs: "build/js",
        csslibs: "build/css",
        fonts: "build/fonts",
    },
    src: {
        html: "src/*html",
        js: "src/js/*.js",
        style: "src/style/*.scss",
        jslibs: "src/jslibs/*.js",
        csslibs: "src/csslibs/*.css",
        fonts: "src/fonts/*.woff"
    },
    watch: {  //  пути к файлам, за которыми будем следить
        html: "src/**/*.html",
        js: "src/js/**/*.js",
        style: "src/style/**/*.scss",
        jslibs: "src/jslibs/*.js",
        csslibs: "src/csslibs/*.css",
        fonts: "src/fonts/*.woff"
    }
};

// Static server
gulp.task('webserver', function() {
    browserSync.init({ // Выполняем browserSync
        server:{ // Определяем параметры сервера
            baseDir:'./build' // Директория для сервера
        },
        notify: false // Отключаем уведомления
    })
});


// сборка файлов
// сборка html
gulp.task("html:build", function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// сборка js
gulp.task("js:build", function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// сборка fonts
gulp.task("fonts:build", function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

// сборка css
gulp.task("style:build", function() {
    return gulp.src(path.src.style)
        .pipe(sass())
        .pipe(preFixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// сборка js-библиотек
gulp.task("jslibs:build", function() {
    return gulp.src(path.src.jslibs)
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest(path.build.jslibs)) // Выгружаем в папку build/js
        .pipe(reload({stream: true})); // Обновляем js на странице при изменении
});

gulp.task("csslibs:build", function() {
    return gulp.src(path.src.csslibs)
        .pipe(cssnano()) // Сжимаем
        .pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.css
        .pipe(gulp.dest(path.build.csslibs)) // Выгружаем в папку build/css
        .pipe(reload({stream: true})); // Обновляем css на странице при изменении

});

// таск для сборки
gulp.task("build",
    gulp.parallel(
        "csslibs:build",
        "fonts:build",
        "jslibs:build",
        "html:build",
        "js:build",
        "style:build"
    )
);



// оптимизация изображений
gulp.task('img', function (){ // оптимизация изображений
    return gulp.src('src/img/**/*')
        /*.pipe(cache(imagemin({
            intelaced: true,
            progressiveLazyLoad:true,
            svgPlugins:[{removeViewBox: false}],
            use: [pngquant()]
        })))*/
        .pipe(gulp.dest('build/img'));
});



// следим за изменениями
gulp.task('watch' , function () {
    gulp.watch([path.watch.style], { usePolling: true }, gulp.parallel('style:build'));
    gulp.watch([path.watch.html], { usePolling: true }, gulp.parallel('html:build'));
    gulp.watch([path.watch.fonts], { usePolling: true }, gulp.parallel('fonts:build'));
    gulp.watch([path.watch.js], { usePolling: true }, gulp.parallel('js:build'));
    gulp.watch([path.watch.jslibs], { usePolling: true }, gulp.parallel('jslibs:build'));
    gulp.watch([path.watch.csslibs], { usePolling: true }, gulp.parallel('csslibs:build'));
    gulp.watch('src/img/**/*', { usePolling: true }, gulp.parallel('img'));
});


// чистим папку build
gulp.task('clean', async function() {
    return del.sync('build'); // Удаляем папку build перед сборкой
});


// дефолтный таск
gulp.task('default', gulp.parallel("clean","img","build","webserver","watch"));


