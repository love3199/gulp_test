//一、 导入模块
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin');
//二、 发布任务
function fnCopyLib(){
    return gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./js'));
}
function fnImg(){
    return gulp.src('./src/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
function fnHTML(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}
function fnWatch(){
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/pages/*.html',fnHTML);
    gulp.watch('./src/image/*',fnImg);
    gulp.watch('./src/lib/*.js',fnCopyLib);
}
//三、导出模块
exports.css = fnCss;
exports.copy = fnCopyIndex;
exports.default = fnWatch;
exports.js = fnJS;
exports.html = fnHTML;
exports.img = fnImg;
exports.lib = fnCopyLib;