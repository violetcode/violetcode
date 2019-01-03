/*!
 * UnderTasker
 * Copyright 2018 Tyler Rilling
 * Licensed under MIT (https://github.com/underlost/Undertasker/blob/master/LICENSE)
 */

// grab our packages
var gulp   = require('gulp'),
    child = require('child_process');
    jshint = require('gulp-jshint');
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');
    autoprefixer = require('gulp-autoprefixer');
    cleanCSS = require('gulp-clean-css');
    rename = require('gulp-rename'); // to rename any file
    uglify = require('gulp-uglify-es').default;
    del = require('del');
    stylish = require('jshint-stylish');
    runSequence = require('run-sequence');
    coffee = require('gulp-coffee');
    gutil = require('gulp-util');
    imagemin = require('gulp-imagemin');
    ghPages = require('gulp-gh-pages');
    git = require('gulp-deploy-git');
    browserSync = require('browser-sync');
    argv = require('minimist')(process.argv.slice(2));
    $ = require('gulp-load-plugins')();

    var messages = {
        jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
    };
    var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Cleans the web dist folder
gulp.task('clean', function () {
    return del([
        'dist/',
        'source/site/dist/**/*',
        '.publish'
    ]);
});

// Copy images
gulp.task('copy-dist', function() {
    return gulp.src('dist/**/*.*').pipe(gulp.dest('source/site/dist'));
});

// Copy fonts task
gulp.task('copy-fonts', function() {
    gulp.src('source/fonts/**/*.{ttf,woff,eof,svg,eot,woff2,otf}')
    .pipe(gulp.dest('dist/fonts'));
    gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,eof,svg,eot,woff2,otf}')
    .pipe(gulp.dest('source/fonts'));
});

// Minify Images
gulp.task('imagemin', function() {
    return gulp.src('source/img/**/*.{jpg,png,gif,ico}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

// Copy Components
gulp.task('copy-components', function() {
    gulp.src('node_modules/@fortawesome/fontawesome-free/scss/**/*.*')
    .pipe(gulp.dest('source/sass/font-awesome'));
    gulp.src('node_modules/bootstrap/scss/**/*.*')
    .pipe(gulp.dest('source/sass/bootstrap'));
});

gulp.task('install', function(callback) {
    runSequence(
        'copy-components', 'copy-fonts', callback
    );
});

// Compile coffeescript to JS
gulp.task('brew-coffee', function() {
    return gulp.src('source/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('source/js/coffee/'))
});

// CSS Build Task
gulp.task('build-css', function() {
  return gulp.src('source/sass/site.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', sass.logError)
});

// Concat All JS into unminified single file
gulp.task('concat-js', function() {
    return gulp.src([
        // Components
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'source/js/site.js',
        // Coffeescript
        'source/js/coffee/*.*',
    ])
    .pipe(sourcemaps.init())
        .pipe(concat('site.js'))
        .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'));
});

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Shrinks all the js
gulp.task('shrink-js', function() {
    return gulp.src('dist/js/site.js')
      .pipe(uglify())
      .pipe(rename('site.min.js'))
      .pipe(gulp.dest('dist/js'))
});

// Default Javascript build task
gulp.task('build-js', function(callback) {
    runSequence('concat-js', 'shrink-js', callback);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/coffee/**/*.js', ['brew-coffee', 'build-js', 'copy-dist']);
    gulp.watch('source/js/**/*.js', ['build-js', 'copy-dist']);
    gulp.watch('source/sass/**/*.scss', ['build-css', 'copy-dist']);
    gulp.watch(['source/site/*.html', 'source/site/_layouts/*.html'], ['jekyll-rebuild']);
});

// Deploy to GitHub Pages
gulp.task('github-deploy', function () {
    var repoPath = require('path').join(require('os').tmpdir(), 'tmpRepo');
    $.util.log('Delete ' + $.util.colors.magenta(repoPath));
    del.sync(repoPath, {force: true});
    del(['./.publish/.git']); // Clear the repo before we try pushing.
    return gulp.src('./.publish/**/*')
    .pipe($.ghPages({
        remoteUrl: 'https://github.com/underlost/UnderTasker.git',
        branch: 'gh-pages'
    }));
});

//Jekyll Tasks
gulp.task('jekyll', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return child.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll'], function () {
    return browserSync.reload();
});

// Default build task
gulp.task('build', function(callback) {
    runSequence(
        'copy-fonts', 'imagemin',
        ['build-css', 'build-js'], 'copy-dist', callback
    );
});

gulp.task('browser-sync', ['build', 'jekyll'], function() {
    browserSync({
        server: {
            baseDir: '.publish'
        }
    });
});

// Deploy to github
gulp.task('github', function(callback) {
    runSequence(
        'clean', 'build', 'jekyll', ['github-deploy'], callback
    );
});

// Deploy to a .git repo
gulp.task('deploy', function() {
    return gulp.src('./source/**/*')
    .pipe(git({
        repository: 'https://github.com/underlost/UnderTasker.git',
        branches:   ['gh-pages'],
        message: 'Deployed with UnderTasker.'
    }));
});

// Default task will build the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);
