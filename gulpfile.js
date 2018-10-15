const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const htmlmin  = require('gulp-htmlmin')
const prefix = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')

// Sass
gulp.task('sass', () => {
  return gulp.src(['./views/assets/scss/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({includePaths: ['scss']}))
    .pipe(prefix(['last 15 versions', '> 1%'], { cascade: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
})

// JavaScript
// gulp.task('js', () =>
//   gulp.src('./views/assets/js/index.js')
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ['env']
//     }))
//     .pipe(gulp.dest('./views/assets/js'))
// );

//Browser Sync
// gulp.task('browser-sync', () => {
//   return browserSync.init(["./views/*.html", "css/*.css", "js/*.js"], {
//     server: {
//       baseDir: "./"
//     }
//   })
// })

gulp.task('default', ['sass'], () => {
  gulp.watch("./views/assets/scss/**/*.scss", ['sass'])
})