const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const rollup = require('gulp-rollup');
const uglify = require('gulp-uglify');

gulp.task('js', () =>
    gulp.src('./src/js/*.js')
        .pipe(rollup({
            "format": "es",
            "allowRealFiles": true,
            "plugins": [
                require("rollup-plugin-babel")({
                    "presets": [["es2015", { "modules": false }]],
                }),
                require('rollup-plugin-node-resolve')({
                    preferBuiltins: false
                }),
                require('rollup-plugin-commonjs')(),
            ],
            input: './src/js/app.js'
        }))
        .pipe(uglify())
        .pipe(rename("index.js"))
        .pipe(gulp.dest('./dist'))
);

gulp.task('scss', () =>
    gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename("styles.css"))
      .pipe(gulp.dest('./dist'))
);

gulp.task('default', [ 'js', 'scss' ]);

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/js/*.js', ['js']);
});