// GULP MODULES
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var strip = require('gulp-strip-comments');
var exec = require('child_process').exec;
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var minify = require('gulp-minify');

// CONFIGURATION
sass.compiler = require('node-sass');

// VARIABLES
var pluginFolder = './plugin/';

// WEB
var webFolder = "./web/";
var webJsFolder = webFolder + 'js/';
var webEditorFolder = webJsFolder + "editor/";
var webCssFolder = webFolder + 'css/';
var webFontfolder = webFolder + 'css/fonts/';

// DIST
var distFolder = "./dist/";
var distJsFolder = distFolder + "js/"
var distLangFolder = distJsFolder + "lang/";
var distCssFolder = distFolder + "css/"

// CONTENT
gulp.task('build', function () {
    gulp.start('scripts');
    gulp.start('styles');
    gulp.start('copy-web');
});

gulp.task('build-dev', function () {
    gulp.start('build');
    gulp.watch(['./index.html', pluginFolder + "**/*.*", './css/*.*', './js/*.*']).on("change", function (event) {
        gulp.start('build');
    });
    gulp.start('server');
})

gulp.task('scripts', function () {
    gulp.src([file('widgets.js'), file('indieauthor.js'), file('plugins.js'), file('model.js'), file('widgets-functions.js'), file('widgets/**/*.js'), file('polyfill.js'), file('transform.js'), file('migrate.js'), file('undoredo.js'), file('api.js'), file('utils.js')])
        .pipe(concat('editor.js'))
        .pipe(strip()) // For deleting the comments
        .pipe(minify({
            ext: {
                min: ".min.js"
            }
        })) // For minifying the javascript
        .pipe(gulp.dest(webEditorFolder))
        .pipe(gulp.dest(distJsFolder));

    gulp.src([file('i18n/*.js')])
        .pipe(gulp.dest(webEditorFolder + "/lang"))
        .pipe(gulp.dest(distLangFolder));

    gulp.src(["./js/*.js"]).pipe(gulp.dest(webJsFolder));
});

gulp.task('styles', function () {
    gulp.src([file('common-styles.scss'), file('widgets/**/*.scss')])
        .pipe(sass())
        .pipe(concat('editor-styles.css'))
        .pipe(gulp.dest(webCssFolder))
        .pipe(gulp.dest(distCssFolder))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(webCssFolder))
        .pipe(gulp.dest(distCssFolder));

    gulp.src(["./css/**.*"]).pipe(gulp.dest(webCssFolder));
    gulp.src(["./css/fonts/*.*"]).pipe(gulp.dest(webFontfolder));
});

// COMMON
gulp.task('copy-web', function () {
    gulp.src(["./index.html", "./favicon.ico", "./manifest.json"]).pipe(gulp.dest(webFolder));
    gulp.src(["./assets/*"]).pipe(gulp.dest(webFolder + "/assets/"));
});

gulp.task('server', function (cb) {
    exec('node server.js', function (err, stdout, stderr) {
        cb(err);
    });
});

// UTILS
function file(filePath) {
    return pluginFolder + filePath;
}