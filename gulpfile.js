var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({ camelize: true }),
  runSequence = require('run-sequence')

gulp.task('css', function() {
  return gulp.src('client/src/styles/main.scss')
           .pipe($.sourcemaps.init())
           .pipe($.sass().on('error', $.sass.logError))
           .pipe($.autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
           }))
           .pipe($.sourcemaps.write())
           .pipe(gulp.dest('./dist'))
})

gulp.task('css:watch', ['css'], function() {
  gulp.watch('./client/src/**/**/**/*.scss', ['css'])
})

gulp.task('moveAssets', function() {
  return gulp.src('./client/assets/**/*')
             .pipe(gulp.dest('./dist/assets'))
})

gulp.task('build:revAssets', ['css', 'moveAssets'], function() {
  var rev = new $.revAll()
  return gulp.src('./dist/**/*')
             .pipe(rev.revision())
             .pipe(gulp.dest('./dist/public'))
             .pipe(rev.manifestFile())
             .pipe(gulp.dest('./dist'))
})

gulp.task('build:cpClient', function() {
  return gulp.src('./client/**/*.{js,ejs}')
             .pipe(gulp.dest('./dist/server-build/client'))
})
gulp.task('build:cpViews', function() {
  return gulp.src('./views/**/*.{js,ejs}')
             .pipe(gulp.dest('./dist/server-build/views'))
})
gulp.task('build:cpBin', function() {
  return gulp.src('./bin/*')
             .pipe(gulp.dest('./dist/server-build/bin'))
})
gulp.task('build:cpApp', function() {
  return gulp.src('./app.js')
             .pipe(gulp.dest('./dist/server-build'))
})
gulp.task('build:cpRoutes', function() {
  return gulp.src('./routes.js')
             .pipe(gulp.dest('./dist/server-build'))
})
gulp.task('build:cpServer', function() {
  return gulp.src('./server/**/*')
             .pipe(gulp.dest('./dist/server-build/server'))
})
gulp.task('build:revServer', ['build:cpClient', 'build:cpServer', 'build:cpViews', 'build:cpBin', 'build:cpApp', 'build:cpRoutes'], function() {
  var manifest = gulp.src('./dist/rev-manifest.json')
  return gulp.src('./dist/server-build/client/src/{components}/**/*')
             .pipe($.revReplace({ manifest: manifest }))
             .pipe(gulp.dest('./dist/server-build'))
})

gulp.task('build', function() {
  runSequence('build:revAssets', 'build:revServer')
})
