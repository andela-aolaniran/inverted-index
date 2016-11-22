//fetch dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync');

//create default task
gulp.task('default', ['test_files_watcher']);


//gulp task to initialize browserSync instance for Test files
gulp.task('test_files_watcher', function(){
	//initialize a browser-sync instance
	var browserSyncJasmine = browserSync.create();
	//Set up browser sync for jasmine test
    browserSyncJasmine.init({
  		server:{
  			baseDir: './jasmine/',
  			index: 'SpecRunner.html'
  		},
  		port: 3009,
  		ui:{
  			port: 3010
  		}
  	});

	//reload SpecRunner.html in the browser whenever any of the jasmine spec test files change
	gulp.watch('./jasmine/spec/*.js',  browserSyncJasmine.reload);
});

//gulp task to initialize browserSync instance for Source files
gulp.task('source_files_watcher', function(){
	//initialize a browser-sync instance
	var browserSyncSource = browserSync.create();
  	//Set up browser sync for src files
    browserSyncSource.init({
  		server:{
  			baseDir: './src',
  			index: 'html/index.html'
  		},
  		port: 3011,
  		ui:{
  			port: 3012
  		}
  	});

	//reload index.html file in the browser whenever any of the source files changes
	gulp.watch([
		'./src/css/*.css',
		'./src/html/index.html',
		'./src/js/*.js'],
		 browserSyncSource.reload);
});
