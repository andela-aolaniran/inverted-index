/**
* A class to implemnt search using
* inverted index functionality
*/
class InvertedIndex {
  /**
  *Constructor for the inverted index class
  */
  constructor() {
    // Object to hold files and their Indexes
    this.fileIndexes = {};
  }

  /**
  * Helper method to get an array of all words in a particular text
  * @param {String} text - String to be normalized and tokenized
  * @return {Array} - An array containing all texts in a string
  */
  static tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '') // If it's not a space/word/alphabet remove it
      .split(/\s+/); // split by spaces of any length
  }

  /**
  * Helper method to get all text(text and title) in a specific book
  * @param {Object} book - book object from which
  * we want to extract all text (title and text)
  * @return {String} - a string containing all texts in the book
  */
  static getAllText(book) {
    // Concatenate the book title and text
    return `${book.title} ${book.text}`;
  }

  /**
  * Searches for indexes of a query string in a file or group of files
  * @param {String} queryString - words to search for.
  * @param {Array} fileNames - Names of files we want to search in
  * @return {Object} - An Object containing each file and the
  * indexes of words in the query string
  */
  searchIndex(queryString, fileNames) {
    // Object to hold each file and their index of each word in the query string
    const fileIndexResult = {};
    // Get an array which contains each word in the query string
    const tokens = InvertedIndex
      .tokenize(queryString);
    // for each file in the files we want to search
    fileNames.forEach((fileName) => {
      // create a temporay object to hold our indexes
      const builtFileIndex = {};
      // get the index object for this file
      const fileIndex = this.fileIndexes[fileName];
      // loop through each word in our query string
      tokens.forEach((word) => {
        // if the word exists, add it to the built file
        // index for our current file
        if (fileIndex[word]) {
          builtFileIndex[word] = fileIndex[word];
        } else {
          builtFileIndex[word] = [];
        }
      });
      // at this point we have a built file index containing indexes of each
      // word in our query string for our current file
      // so add it to our overall map index for files
      fileIndexResult[fileName] = builtFileIndex;
      // repeat all steps for the next file in our fileNames array
      // Yaay, I got it :)
    });
    // at the end return our file index object which contains index
    // for each word in our query string
    return fileIndexResult;
  }

  /**
  * Creates Index for a specific file and add it to the files Map
  * @param {String} fileName - Name of the book file
  * @param {Array} booksArray - Array of books in the file
  * @return {String} A message describing the status of the operation
  */
  createIndex(fileName, booksArray) {
    // Check that we have a valid book file
    if (!InvertedIndex.isBooksValid(booksArray)) {
      // book is not valid, return false
      return 'Invalid File';
    }
    // Don't create an index for an already existing file
    if (this.fileIndexes[fileName]) {
      return 'Index Already Exists';
    }

    // Initialize a new object to hold indexes for this file
    const fileIndex = {};
    // start the index creation process
    booksArray.forEach((value, index) => {
      // get all the strings in this book
      const textArray = InvertedIndex.tokenize(InvertedIndex.getAllText(value));
      textArray.forEach((word) => {
        InvertedIndex.addWordToFileIndex(fileIndex, word, index);
      });
    });
    // add the created index to the map of all indexes
    this.fileIndexes[fileName] = fileIndex;
    return 'Index Created';
  }

  /**
  * Get the index map of a specific file name from the files map
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
  * Helper method to add a word and its docID to an index
  * @param {Map} fileIndex - Map to hold words and their indexes
  * @param {String} word - Word to be added to the fileIndex
  * @param {Number} docId - ID of document in which the word exists
  * @return {Boolean} True if word was added to the index map or false otherwise
  */
  static addWordToFileIndex(fileIndex, word, docId) {
    let returnValue = false;
    // check that this word hasn't been keyed
    if (fileIndex[word] && fileIndex[word].indexOf(docId) < 0) {
      // If it has been keyed just add a unique docId
      fileIndex[word].push(docId);
      returnValue = true;
    } else {
      // create a new array to hold our doc ID
      const docIds = [];
      docIds.push(docId);
      fileIndex[word] = docIds;
      returnValue = true;
    }
    return returnValue;
  }

  /**
  * Adds two numbers
  * @param {Array} booksArray The array of books to verify
  * @return {Boolean} true if the booksArray is valid and false otherwise
  */
  static isBooksValid(booksArray) {
    if (Array.isArray(booksArray) && booksArray.length > 0) {
      return true;
    }
    return false;
  }
}
