angular.module('invertedIndexModule', [])
  .controller('invertedIndexController', ($scope) => {
    // inverted index model
    $scope.invertedIndex = new InvertedIndex();
    $scope.uploadedFiles = [];
    $scope.indexedFiles = [];
    $scope.tableFiles = {};
    $scope.tableHeader = {};

    /**
    * Helper method to upload files from the
    * front end using HTML 5 api
    * @param {File} filesObject - Object containing selected files
    * @returns {Boolean} true if upload is successful, otherwise false
    */
    $scope.uploadFile = (filesObject) => {
      let uploaded = false;
      const files = Array.from(filesObject.target.files);
      $scope.invalidFiles = [];
      files.forEach((file) => {
        $scope.$apply(() => {
          if (file.type === 'application/json') {
            $scope.uploadedFiles.push(file);
            uploaded = true;
          } else {
            $scope.invalidFiles.push(file.name);
          }
        });
      });
      return uploaded;
    };

    /**
    * Method to show correct index when the user selects
    * what file to match the searches across
    * @param{File} searchFile - file to match the search across
    * @return{undefined}
    */
    $scope.searchFileChanged = (searchFile) => {
      if (searchFile) {
        $scope.tableFiles = $scope.invertedIndex.getIndex([searchFile.name]);
      } else {
        const searchNames = [];
        $scope.indexedFiles.forEach((file) => {
          searchNames.push(file.name);
        });
        $scope.tableFiles = $scope.invertedIndex.getIndex(searchNames);
      }
    };

    /**
    * Method to create index for a file selected on the front end
    * @param {File} file - selected file which we want to create it's index
    * @return {Boolean} true if index was successfully created, false otherwise
    */
    $scope.createIndex = (file) => {
      let indexCreated = '';
      if (!file) {
        $scope.indexingFeedback = 'Please select a file to generate index';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        let bookFile = {};
        try {
          bookFile = JSON.parse(reader.result);
        } catch (err) {
          $scope.indexingFeedback = 'Could not read invalid JSON file';
          return;
        }
        $scope.indexingFeedback = '';
        const tempBooks = Array.from(bookFile);
        const titles = {};
        tempBooks.forEach((value, index) => {
          titles[index] = (value.title);
        });
        indexCreated = $scope.invertedIndex.createIndex(file.name, bookFile);
        $scope.$apply(() => {
          if (indexCreated === 'Index Created') {
            $scope.indexedFiles.push(file);
            $scope.tableHeader[file.name] = titles;
            $scope.filesIndex = $scope.invertedIndex.fileIndexes;
          } else {
            $scope.indexingFeedback = indexCreated;
          }
          $scope.tableFiles = $scope.invertedIndex.getIndex([file.name]);
          $scope.searchFile = file;
        });
      };

      reader.readAsText(file);
      return indexCreated;
    };

    /**
    * Method to get an array of keys in an object
    * @param{Object} header - object who's keys are
    * to be converted to an array
    * @return{Array} Array containing all the keys in
    * the object
    */
    $scope.headerList = (header) => {
      const convertedKeys = Object.keys(header);
      return Array.from(convertedKeys);
    };

    /**
    * Method to convert the string key to an object
    * @param{String} key - key to be converted to a number
    * @return{Number} a number value of the key
    */
    $scope.convertToInteger = (key) => {
      const convertedKey = parseInt(key, 10);
      return convertedKey;
    };

    /**
    * Method to search for words in our Index(es)
    * @param {String} query - A string of words to search for
    * @param {Object} searchFile - An object holding information
    * of the file to search
    * @return {Undefined} returning nothing
    */
    $scope.search = (query, searchFile) => {
      if (!query || query.trim().length < 1) {
        return;
      }
      if (searchFile) {
        $scope.tableFiles = $scope.invertedIndex
          .searchIndex(query, [searchFile.name]);
      } else {
        const searchTokens = [];
        $scope.indexedFiles.forEach((value) => {
          searchTokens.push(value.name);
        });
        $scope.tableFiles = $scope.invertedIndex
          .searchIndex(query, searchTokens);
      }
    };

    document.getElementById('file_browser')
      .addEventListener('change', $scope.uploadFile);
  });
