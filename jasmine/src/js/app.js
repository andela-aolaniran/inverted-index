angular.module('invertedIndexModule', [])
  .controller('invertedIndexController', function main_controller($scope) {
    const app = this;
    app.invertedIndex = new InvertedIndex();
    app.showIndexTable = false;
    app.showQueryTable = false;
    app.uploadedFiles = [];
    app.search = (queryString) => {
      app.createdIndex = app.invertedIndex.searchIndex(queryString);
      app.tableTitle = 'Search Results';
    };
    app.createIndex = (file) => {
      try {
        const reader = new FileReader();
        // Ensure we are in angular digest loop
        // when we make changes so they can be reflected immediately
        reader.onload = () => {
          const jsonData = JSON.parse(reader.result);
          $scope.$apply(() => {
            app.headerArray = Array.from(Array(jsonData.length).keys());
            app.createdIndex = app.invertedIndex.createIndex(jsonData);
            app.queryString = '';
            // Show index table if the created index is greater than 1
            app.showIndexTable = app.createdIndex.length > 0;
            app.tableTitle = `Generated Index : 
            ${file.name.replace('.json', '')}`;
          });
        };
        reader.readAsBinaryString(file);
      } catch (err) {
        alert('Select a file from the dropdown list');
      }
    };
    app.uploadFile = (event) => {
      const files = Array.from(event.target.files);
      $scope.$apply(() => { // Ensure we are in the angular digestLoop
        app.uploadedFiles = files;
      });
    };
    document.getElementById('file_browser')
      .addEventListener('change', app.uploadFile);
  });
