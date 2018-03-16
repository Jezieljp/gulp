var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
 return gulp.src('assets/src/sass/**/*.scss')//pega arquivo na pasta
 .pipe(concat('style.min.css'))//renomeia o arquivo
 .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
 .pipe(gulp.dest('assets/css'));//destino do sass para css 
})

//javascript
gulp.task('js', function(){
    return gulp.src('assets/src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify({compress:{
      sequences:false
    }}))
    .pipe(gulp.dest('assets/js'))
})

//Obsevando as task e executando
gulp.task('default', ['sass', 'js']);

