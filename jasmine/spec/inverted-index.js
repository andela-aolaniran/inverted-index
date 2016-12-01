/**
* A class to implement search using
* inverted index functionality
*/
class InvertedIndex {
  /**
  * Constructor for the inverted-index class
  */
  constructor() {
    this.fileIndexes = {};
  }

  /**
  * Searches for indexes of a query string in a file or group of files
  * @param {String} query - words to search for.
  * @param {Array} fileNames - Names of files we want to search in
  * @return {Object} - An Object containing each file and the
  * indexes of words in the query string
  */
  searchIndex(query, fileNames) {
    const fileIndexResult = {};
    const tokens = Utility.tokenize(query);
    fileNames.forEach((fileName) => {
      const builtFileIndex = {};
      const fileIndex = this.fileIndexes[fileName];
      tokens.forEach((word) => {
        if (fileIndex[word]) {
          builtFileIndex[word] = fileIndex[word];
        } else {
          builtFileIndex[word] = [];
        }
      });
      fileIndexResult[fileName] = builtFileIndex;
    });
    return fileIndexResult;
  }

  /**
  * Creates Index for a specific file and add it to the files map
  * @param {String} fileName - Name of the book file
  * @param {Array} books - Array of books in the file
  * @return {String} A message describing the status of the operation
  */
  createIndex(fileName, books) {
    if (!InvertedIndex.isBooksValid(books)) {
      return 'Invalid File';
    }
    if (this.fileIndexes[fileName]) {
      return 'Index Already Exists';
    }

    const fileIndex = {};
    books.forEach((value, index) => {
      const words = Utility.tokenize(Utility.getAllText(value));
      words.forEach((word) => {
        Utility.addWordToFileIndex(fileIndex, word, index);
      });
    });
    this.fileIndexes[fileName] = fileIndex;
    return 'Index Created';
  }

  /**
  * Get the index map of a specific file names from the files map
  * @param {Array} fileNames - Array of file names to search for
  * @return {Object} - An object containing the indexes for books in each file
  * or an empty object
  */
  getIndex(fileNames) {
    const foundIndexes = {};
    fileNames.forEach((fileName) => {
      if (this.fileIndexes[fileName]) {
        foundIndexes[fileName] = this.fileIndexes[fileName];
      }
    });
    return foundIndexes;
  }

  /**
  * Method to test if a book is valid
  * @param {Array} books - The array of books to verify
  * @return {Boolean} true if the books is valid and false otherwise
  */
  static isBooksValid(books) {
    if (Array.isArray(books) && books.length > 0) {
      return true;
    }
    return false;
  }
}
