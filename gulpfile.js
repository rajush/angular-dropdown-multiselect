var gulp         = require("gulp");
var  browserSync = require( 'browser-sync' );
var concat       = require("gulp-concat");
var clean        = require("gulp-clean");
var uglify       = require("gulp-uglify");
var cleanCSS     = require("gulp-clean-css");
var rename       = require("gulp-rename");
var size         = require("gulp-size");

var paths = {
    css: ["src/assets/*.css"],
    js: ["src/assets/*.js"],
    dest: "dist/"
};

gulp.task("browser-sync", function(){
    browserSync({
        server: {
            baseDir: "./src",
            routes: {
                "/node_modules": "node_modules",
                "/dist": "dist"
            }
        },
        port: 8080,
        files: "./src/**/*",
        browser: "google chrome",
        notify: false,
        injectChanges: true
    });
});

// Clean before re-build
gulp.task("clean", function(){
    return gulp.src(paths.dest, {read: false})
        .pipe(clean());
});

// File size
gulp.task("size", function(){
    return gulp.src(paths.js)
        .pipe(size({showFiles: true}));
});

// Concatenate & Minify JS
gulp.task("scripts", ["size"], function(){
    return gulp.src(paths.js)
        .pipe(concat("angular-dropdownMultiselect.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.dest));
});

// Minify CSS
gulp.task("styles", ["size"], function(){
    return gulp.src(paths.css)
        .pipe(concat("angular-dropdownMultiselect.css"))
        .pipe(cleanCSS({debug: true}))
        .pipe(rename({suffix: ".min"}))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.dest));
});

// Watch
gulp.task("watch", function(){
    gulp.watch("src/**/*.js", ["scripts"]);
});

gulp.task("default", ["browser-sync", "clean", "scripts", "styles", "watch"]);
