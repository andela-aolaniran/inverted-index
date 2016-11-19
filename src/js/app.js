angular.module('invertedIndexModule', []).
controller('invertedIndexController', function main_controller($scope){
	const app = this ;
	app.invertedIndex = new InvertedIndex();
	app.showIndexTable = false ;
	app.showQueryTable = false ;
	app.uploadedFiles = [];
	app.headerArray ;  
	
	app.search = (queryString) =>{
		app.createdIndex = [...app.invertedIndex.searchIndex(queryString)];
	};

	app.createIndex = (file) =>{
		let reader = new FileReader();
		reader.onload = (e) => {
		let jsonData = JSON.parse(reader.result);
			$scope.$apply(() =>{ //Ensure we are in angular digest loop when we make changes so they can be reflected immediately
				app.headerArray = [...Array(jsonData.length).keys()];
				app.createdIndex = [...app.invertedIndex.createIndex(jsonData)];
				app.queryString = '';
				app.showIndexTable = app.createdIndex.length > 0 ; // Show index table if the created index is greater than 1
			});
		}
		reader.readAsBinaryString(file);
	}

	app.uploadFile = (event) =>{
    let files = event.target.files;
    for(file of files){
    	$scope.$apply(() => { //Ensure we are in the angular digestLoop
    		app.uploadedFiles.push(file);
    	});
    	
    }
  };

  document.getElementById('file_browser').addEventListener('change', app.uploadFile);
});