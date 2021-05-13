// GULP MODULES
const fs = require('fs');

const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const strip = require('gulp-strip-comments');
const exec = require('child_process').exec;
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const minify = require('gulp-minify');

// CONFIGURATION
sass.compiler = require('node-sass');

// VARIABLES
const pluginFolder = './src/plugin/';

// WEB
const webFolder = "./web/";
const webJsFolder = webFolder + 'js/';
const webEditorFolder = webJsFolder + "editor/";
const webCssFolder = webFolder + 'css/';
const webVendorFolder = webFolder + 'vendor/';

// DIST
const distFolder = "./dist/";
const distJsFolder = distFolder + "js/"
const distLangFolder = distJsFolder + "lang/";
const distCssFolder = distFolder + "css/"

// CONTENT
gulp.task('build', function (done) {
    runSequence('scripts', 'styles', 'copy-vendor', 'copy-web');

    done();
});

gulp.task('build-dev', function (done) {
    runSequence('build', 'server')
    gulp.watch(['./src/index.html', pluginFolder + "**/*.*", './css/*.*', './js/*.*']).on("change", function (event) {
        runSequence('build');
    });

    done();
})

gulp.task('scripts', function (done) {
    gulp.src([plguinFile('widgets.js'), plguinFile('indieauthor.js'), plguinFile('plugins.js'), plguinFile('model.js'), plguinFile('widgets-functions.js'), plguinFile('widgets/**/*.js'), plguinFile('polyfill.js'), plguinFile('undoredo.js'), plguinFile('api.js'), plguinFile('utils.js')])
        .pipe(concat('editor.js'))
        .pipe(strip()) // For deleting the comments
        .pipe(minify({
            ext: {
                min: ".min.js"
            }
        })) // For minifying the javascript
        .pipe(gulp.dest(webEditorFolder))
        .pipe(gulp.dest(distJsFolder));

    gulp.src([plguinFile('i18n/*.js')])
        .pipe(gulp.dest(webEditorFolder + "/lang"))
        .pipe(gulp.dest(distLangFolder));

    done();
});

gulp.task('styles', function (done) {
    gulp.src([plguinFile('common-styles.scss'), plguinFile('widgets/**/*.scss')])
        .pipe(sass())
        .pipe(concat('editor-styles.css'))
        .pipe(gulp.dest(webCssFolder))
        .pipe(gulp.dest(distCssFolder))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(webCssFolder))
        .pipe(gulp.dest(distCssFolder));

    gulp.src(["./src/css/**.*"]).pipe(gulp.dest(webCssFolder));

    done();
});

gulp.task('copy-vendor', async () => {
    const vendors = JSON.parse(fs.readFileSync('./src/vendor.json', 'utf8'));

    vendors.forEach(vendor => {
        const vendorFiles = vendor.files.map(file => vendor.moduleFolder + file);
        gulp.src(vendorFiles).pipe(gulp.dest(webVendorFolder + vendor.distfolder));
    });
});

// COMMON
gulp.task('copy-web', function (done) {
    gulp.src(["./src/index.html", "./src/favicon.ico", "./src/manifest.json"]).pipe(gulp.dest(webFolder));

    done();
});

gulp.task('server', function (cb) {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        cb(err);
    });
});

// UTILS
function plguinFile(filePath) {
    return pluginFolder + filePath;
}