angular.module('invertedIndexModule', []).
controller('invertedIndexController', function main_controller($scope){
	const app = this ;
	app.invertedIndex = new InvertedIndex();
	//app.books = books ;
	app.searchResult ;
	app.showIndexTable = false ;
	app.showQueryTable = false ;
	app.uploadedFiles = [];
	this.uploadedFiles = ['a'];
	this.createdIndex = [...this.invertedIndex.createIndex(books)];//convert map to an array
	app.headerArray =  [...Array(books.length).keys()];
	
	app.search = (queryString) =>{
		app.searchResult = [...app.invertedIndex.searchIndex(queryString)];
		app.showQueryTable = app.searchResult.length > 0 ;
	};

	app.createIndex = (file) =>{
		var reader = new FileReader();
		reader.onload = function(e) {
			let jsonData = JSON.parse(reader.result);
				app.queryText = '';
				app.headerArray = [...Array(jsonData.length).keys()];
				app.createdIndex = [...app.invertedIndex.createIndex(jsonData)];
				app.searchResult = undefined ;
				app.showIndexTable = app.createdIndex.length > 0 ; // Show index table if the created index is greater than 1
				console.log("Fir read finished");
				//app.createIndex(file);
		}	
		reader.readAsBinaryString(file);
		//console.log('create Index clicked for' + file.name);
	}

	app.uploadFile = (event) =>{
    let files = event.target.files;
    for(file of files){
    	console.log(file.name);
    	$scope.$apply(() => {
    		app.uploadedFiles.push(file);
    	});
    	
    }
  };

  document.getElementById('file_browser').addEventListener('change', app.uploadFile);

});