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
    port: 3013
  });
});

// gulp task to pipe src file to the
// jasmine spec directory
gulp.task('pipe_src_to_spec', () => {
  gulp.src('./src/js/inverted-index.js')
    .pipe(gulp.dest('./jasmine/spec'));
});

// task to reload browser when ever
// src files (.html, .css, .js) changes
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
  // reload index.html in the browser
  // whenever any of the src files change
  gulp.watch(['./src/js/*.js',
    './src/html/*.html', './src/css/*.css'],
    srcServer.reload);
});

// gulp task to reload the jasmine browser
// whenever any of the spec test files change
gulp.task('spec_files_watcher', () => {
  const specServer = browserSync.create();
  // set up browser sync for spec files
  specServer.init({
    server: {
      baseDir: './jasmine/',
      index: './SpecRunner.html'
    },
    port: 3011
  });
  gulp.watch('./jasmine/spec/*.js', specServer.reload);
});


/*
// create default task
gulp.task('default', ['test_files_watcher']);

// create development task
gulp.task('dev', ['test_files_watcher', 'source_files_watcher']);


// gulp task to initialize browserSync instance for Test files
gulp.task('test_files_watcher', () => {
  // initialize a browser-sync instance
  const browserSyncJasmine = browserSync.create();
  // Set up browser sync for jasmine test
  browserSyncJasmine.init({
    server: {
      baseDir: './jasmine',
      index: 'SpecRunner.html'
    },
    port: 3009,
    ui: {
      port: 3010
    }
  });

  // reload SpecRunner.html in the browser
  // whenever any of the jasmine spec test files change
  gulp.watch('./jasmine/spec/*.js', browserSyncJasmine.reload);
});

// gulp task to pipe the inverted index src file
// into the jasmine spec folder
gulp.task('spec', () => {
  gulp.src('./src/js/inverted-index.js')
    .pipe(gulp.dest('./jasmine/spec'));
});

// gulp task to initialize browserSync instance for Source files
gulp.task('source_files_watcher', () => {
  // initialize a browser-sync instance
  const browserSyncSource = browserSync.create();
  // Set up browser sync for src files
  browserSyncSource.init({
    server: {
      baseDir: './src',
      index: 'html/index.html'
    },
    port: 3011,
    ui: {
      port: 3012
    }
  });

// reload index.html file in the
// browser whenever any of the source files changes
  gulp.watch([
    './src/css/*.css',
    './src/html/index.html',
    './src/js/*.js'],
     [browserSyncSource.reload, 'spec']);
});
*/
