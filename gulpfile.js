var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require("browser-sync").create();
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


gulp.task('sass', function(){
 return gulp.src('assets/src/sass/**/*.scss')//pega arquivo na pasta
 .pipe(concat('style.min.css'))//renomeia o arquivo
 .pipe(sass({outputStyle: 'compressed'}))//.on('error', sass.logError))
 .on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
 .pipe(gulp.dest('assets/css')) 
 .pipe(browserSync.stream());
});

//javascript
gulp.task('js', function(){
    return gulp.src('assets/src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify({compress:{
      sequences:false
    }}))
    .pipe(gulp.dest('assets/js'))
})

//Minificando o html
gulp.task('htmlmin', function() {
    return gulp.src('html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'))

});
//liveReload
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
  
});

//WATCH SERVE PARA OBSERVA MINHA TAREFAS
gulp.task('watch', function(){
    gulp.watch('assets/src/sass/**/*.scss', ['sass']);
    gulp.watch('assets/src/js/**/*.js', ['js']);
    gulp.watch('html/**/*.html', ['htmlmin']);
});

//MOSTRA ERROS NO JS
gulp.task('lint', function(){
    return gulp.src('assets/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//Obsevando as task e executando
gulp.task('default', ['sass', 'js', 'htmlmin', 'watch', 'server']);

