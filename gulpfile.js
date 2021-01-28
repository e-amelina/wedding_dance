const { src, dest, watch, parallel } = require('gulp');
        sass               = require('gulp-sass'),
        concat             = require('gulp-concat'),
        autoprefixer       = require('gulp-autoprefixer'),
        iconfont           = require('gulp-iconfont'),
        browserSync        = require('browser-sync').create(),
        iconfontCss        = require('gulp-iconfont-css');
        uglify             = require('gulp-uglify-es').default;

function styles() {
    return src([
        'src/styles/style.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false}))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream())
}

function watching() {
    watch(['src/styles/**/*.scss'], styles);
    watch(['src/*.html']).on('change', browserSync.reload);
    watch(['src/js/main.js', '!src/js/main.min.js'], scripts);
}

function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.min.js',
        'src/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js/'))
    .pipe(browserSync.stream())
}

function browsersync(params) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        notify: false
    })
}

function build () {
    return src([
        'src/assets/**/*',
        'src/fonts/**/*',
        'src/js/main.min.js',
        'src/css/style.min.css',
        'src/*.html',
    ], {base: 'src'})
        .pipe(dest('dist/'))
}

const fontName = 'icons';

function iconfonts() {
    return src('src/assets/icons/*.svg')
    .pipe(
        iconfontCss( {
            // где будет наш scss файл
            targetPath: '../styles/common/_icons.scss',
            // пути подлючения шрифтов в _icons.scss
            fontPath: '../fonts/',
            fontName: fontName
        })
    )
    .pipe(iconfont( {
            fontName: fontName,
            formats: [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
            normalize: true,
            fontHeight: 1001
        })
    )
    .pipe(dest('src/fonts'))   
}

exports.styles = styles;
exports.watching = watching;
exports.iconfonts = iconfonts;
exports.browsersync = browsersync;
exports.build = build;

exports.default = parallel(scripts, browsersync, watching, build);