var gulp         = require("gulp");
var  browserSync = require( 'browser-sync' );
var templateCache = require('gulp-angular-templatecache');
var concat       = require("gulp-concat");
var clean        = require("gulp-clean");
var uglify       = require("gulp-uglify");
var cleanCSS     = require("gulp-clean-css");
var rename       = require("gulp-rename");
var size         = require("gulp-size");
var htmlmin      = require('gulp-htmlmin');

var paths = {
    css: ["src/assets/*.css"],
    js: ["src/assets/*.js", "src/assets/temp/*.js"],
    html: ["src/assets/*.html"],
    temp: "src/assets/temp/",
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

// Clean after re-build completion
gulp.task("clean-temp", function(){
    return gulp.src(paths.temp, {read: false})
        .pipe(clean());
});


// File size
gulp.task("size", function(){
    return gulp.src(paths.js)
        .pipe(size({showFiles: true}));
});

/**
* Takes html templates and transform them to angular templates (javascript)
*/
gulp.task("templates", function() {
    return gulp.src(paths.html)
     .pipe(htmlmin({
          empty: true,
          spare: true,
          quotes: true
      }))
      .pipe(templateCache())
      //put all those to our javascript file
      .pipe(concat("templates.js"))
      .pipe(gulp.dest(paths.temp));
  })


// Concatenate & Minify JS
gulp.task("scripts", ["size", "templates"], function(){
    return gulp.src(paths.js)
        .pipe(concat("angular-dropdownMultiselect.js"))
        //then, uglify the `angular-dropdownMultiselect.js` and rename it to `angular-dropdownMultiselect.min.js`
        //mangling might cause issues with angular
        .pipe(uglify({mangle: false}))
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
    gulp.watch("src/**/*.html", ["scripts"]);
});

gulp.task("default", ["browser-sync", "clean", "scripts", "styles", "watch"]);
