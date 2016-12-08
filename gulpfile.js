// fetch dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync');

// default task to start the server
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: './src/',
      index: 'html/index.html'
    },
    port: process.env.PORT || 3013
  });
});

/* task to reload browser whenever
   src files (.html, .css, .js) changes */
gulp.task('src_files_watcher', () => {
  const srcServer = browserSync.create();
  // Set up browser sync for src files
  srcServer.init({
    server: {
      baseDir: './src/',
      index: './html/index.html'
    },
    port: 3009
  });
  /* reload index.html in the browser
     whenever any of the src files change */
  gulp.watch(['./src/js/*.js',
    './src/html/*.html', './src/css/*.css'],
    srcServer.reload);
});

/* gulp task to reload the jasmine browser
   whenever any of the spec test files change */
gulp.task('spec_files_watcher', () => {
  const specServer = browserSync.create();
  // set up browser sync for spec files
  specServer.init({
    server: {
      baseDir: ['./jasmine/', './src/js/'],
      index: './SpecRunner.html'
    },
    port: 3011
  });
  gulp.watch([
    './jasmine/spec/*.js',
    './src/css/*.css',
    './src/html/*.html',
    './src/js/*.js'
    ], specServer.reload);
});
