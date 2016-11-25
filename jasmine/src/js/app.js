angular.module('invertedIndexModule', [])
  .controller('invertedIndexController', ($scope) => {
    // inverted index model
    $scope.invertedIndex = new InvertedIndex();
    // Array to hold our files Index

    // Array to hold files which I have reference to
    $scope.uploadedFiles = [];

    // Array to hold files who's index have been created
    $scope.indexedFiles = [];

    // Array to hold row headers for current table showed
    $scope.tableFiles = [];

    // Object to hold table header based
    // number of books in a file
    $scope.tableHeader = {};

    /**
    * Helper method to upload files from the
    * front end using HTML 5 api
    * @param {File} filesObject - Object containing selected files
    * @returns {Boolean} true if upload is successful, otherwise false
    */
    $scope.uploadFile = (filesObject) => {
      let uploaded = false;
      $scope.invertedIndex.name = 'say hello again';
      const files = Array.from(filesObject.target.files);
      files.forEach((file) => {
        $scope.$apply(() => {
          $scope.uploadedFiles.push(file);
          uploaded = true;
        });
      });
      return uploaded;
    };

    /**
    * Method to create index for a file selected on the front end
    * @param {File} file - selected file which we want to create it's index
    * @return {Boolean} true if index was successfully created, false otherwise
    */
    $scope.createIndex = (file) => {
      let indexCreated = '';
      // Catch errors when reading files
      try {
        const reader = new FileReader();
        // Ensure we are in angular digest loop
        // when we make changes so they can be reflected immediately
        reader.onload = () => {
          const jsonData = JSON.parse(reader.result);
          // create an array to hold docIds based
          // on on the number of books in  jsonData
          const headerArray = Array.from(Array(jsonData.length).keys());
          indexCreated = $scope.invertedIndex.createIndex(file.name, jsonData);
          // make changes in the angular loop to see them
          // reflected in view
          $scope.$apply(() => {
            // check to see that index was successfully created
            if (indexCreated === 'Index Created') {
              $scope.indexedFiles.push(file);
              $scope.tableHeader[file.name] = headerArray;
              $scope.tableFiles = $scope.invertedIndex.getIndex(file.name);
              $scope.filesIndex = $scope.invertedIndex.filesMap;
            } else {
              // Show user feed back
            }
          });
        };
        // read file object
        reader.readAsBinaryString(file);
      } catch (err) {
        // Catch errors
      }
      return indexCreated;
    };

    /**
    * Method to search for words in our Index(es)
    * @param {String} queryText - A string of words to search for
    * @param {Object} searchFile - An object holding information
    * of the file to search
    * @return {Undefined} returning nothing
    */
    $scope.search = (queryText, searchFile) => {
      // disallow search for empty query texts
      if (!queryText || queryText.trim().length < 1) {
        return;
      }
      // if search file is defined it means we aren't searching all files
      if (searchFile) {
        $scope.tableFiles = $scope.invertedIndex
          .searchIndex(queryText, [searchFile.name]);
      } else {
        // create an array of all our indexed file names
        const searchArray = [];
        $scope.indexedFiles.forEach((value) => {
          searchArray.push(value.name);
        });
        // search for query text in all the indexed files
        $scope.tableFiles = $scope.invertedIndex
          .searchIndex(queryText, searchArray);
      }
    };

    document.getElementById('file_browser')
      .addEventListener('change', $scope.uploadFile);
  });
