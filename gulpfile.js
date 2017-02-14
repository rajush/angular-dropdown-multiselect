var gulp         = require("gulp");
var  browserSync = require( 'browser-sync' );
var concat       = require("gulp-concat");
var clean        = require("gulp-clean");
var uglify       = require("gulp-uglify");
var rename       = require("gulp-rename");
var size         = require("gulp-size");

var paths = {
    js: ["src/assets/*.js"],
    dest: "dist/"
};

gulp.task("browser-sync", function(){
    browserSync({
        server: {
            baseDir: "./src",
            routes: {
                "/node_modules": "node_modules"
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
    return gulp.src("dist", {read: false})
        .pipe(clean());
});

gulp.task("size", function(){
    return gulp.src(paths.js)
        .pipe(size({showFiles: true}));
});

// Concatenate & Minify JS
gulp.task("scripts", ["clean", "size"], function(){
    return gulp.src(paths.js)
        .pipe(concat("angular-dropdown-multiselect.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.dest));
});

// Watch
gulp.task("watch", function(){
    gulp.watch("src/js/*.js", ["scripts"]);
});

gulp.task("default", ["browser-sync", "scripts", "watch"]);
