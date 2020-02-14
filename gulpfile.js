const Options = require('./config')

/* 基础 */
const gulp = require('gulp')
const browserSync = require('browser-sync') // 浏览器自动刷新
/* CSS处理 */
const sass = require('gulp-sass')
const postcss = require('gulp-postcss') // CSS 后处理器
const px2rem = require('postcss-px2rem') // px -> rem，配合 flexible.js 使用
const autoprefixer = require('autoprefixer') // 为 CSS 添加浏览器私有前缀

/* 静态服务器 */
gulp.task('browser-sync', () => {
  return browserSync.init(Options.browserSync)
})

/* 编译CSS，SASS --> CSS */
gulp.task('css', () => {
  let devProcessors = [autoprefixer(Options.css.autoprefixer)]
  if (Options.css.px2rem.open) devProcessors.unshift(px2rem(Options.css.px2rem))

  return gulp
    .src([`src/sass/*.scss`])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss(devProcessors))
    .pipe(gulp.dest(`src/css`))
})

/* 监听 sass 文件夹下的 *.scss 文件变化，然后执行 css:dev 命令 */
gulp.task('watch:css', ['css'], () => {
  gulp.watch([`src/sass/**/*.scss`], ['css'])
})

/* 开发任务 */
gulp.task('dev', ['watch:css', 'browser-sync'], () => {
  return gulp
    .watch([`src/**/*.html`, `src/**/*.css`, `src/**/*.js`])
    .on('change', browserSync.reload)
})

