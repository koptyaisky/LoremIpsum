let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefix = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
let pug = require('gulp-pug');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let webpack = require('webpack');
let webpackStream = require('webpack-stream');
let browserSync = require('browser-sync');
let watch = require('gulp-watch');
let runSequence = require('run-sequence');
let concat = require('gulp-concat');

/*
	css
*/
let filesCSS = ['!scss/consts.sass', '!scss/mix.sass', '!scss/reset.sass', '!scss/fonts.sass', 'scss/*.sass'];

gulp.task('sass', function () {
	gulp.src(filesCSS)
		.pipe(sass({errLogToConsole: true}))
        .pipe(autoprefix())
        .pipe(concatCss("style.css"))
		.pipe(gulp.dest('dist/'))
});

/*
    css plugin
 */
let pluginCSS = ['css/*.css'];
gulp.task('pluginCSS', function() {
   gulp.src(pluginCSS)
       .pipe(concatCss("plugin.css"))
       .pipe(cleanCSS())
       .pipe(rename({ suffix: '.min' }))
       .pipe(gulp.dest('dist/'))
});


/*
	html
*/
gulp.task('pug', function() {
    gulp.src('pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(''))
});

/*
	js
*/
gulp.task('script', function () {
  return gulp.src('./js/main.js')
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'))
});

/*
    plugin
 */
let plugin = ['!js/main.js', 'js/*.js'];
gulp.task('plugin', function() {
    return gulp.src(plugin)
        .pipe(concat('plugin.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
});


gulp.task('default', ['serve']);

gulp.task('watch', ['pug', 'sass', 'pluginCSS', 'script', 'plugin'], function() {
    gulp.watch('pug/**/*.pug',  ['pug']);
    gulp.watch('scss/**/*.sass',  ['sass']);
    gulp.watch('css/**/*.css',  ['pluginCSS']);
    gulp.watch('js/main.js', ['script']);
    gulp.watch('js/**/*.js', ['plugin']);
    gulp.watch("/*.html");
});




