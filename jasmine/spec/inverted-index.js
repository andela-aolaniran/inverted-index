/**
* A class to implemnt search using
* inverted index functionality
*/
class InvertedIndex {
  /**
  *Constructor for the inverted index class
  */
  constructor() {
    // Map to hold word and a Set of documents they appear in
    // this.mapIndex = new Map();
    // array to hold list of files from the user
    this.filesMap = {};
  }

  /**
  * Helper method to get an array of all words in a particular text
  * @param {String} text - String to be normalized and tokenized
  * @return {Array} - An array containing all texts in a string
  */
  static tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '') // If it's not a space or a word remove it
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
  * @param {Array} filesName - Names of files we want to search in
  * @return {Map} - A map containing each file and the
  * indexes of words in the query string
  */
  searchIndex(queryString, filesName) {
    // Map to hold each file and their index of each word in the query string
    const fileMapIndex = {};
    // Get an array which contains each word in the query string
    const tokens = InvertedIndex
      .tokenize(queryString);
    // for each file in the files we want to search
    filesName.forEach((fileName) => {
      // create a temporay map to hold our indexes
      const builtMap = {};
      // get the index map for this file
      const fileMap = this.filesMap[fileName];
      // loop through each word in our query string
      tokens.forEach((word) => {
        // if the word exists, add it to the built map for our current file
        if (fileMap[word]) {
          builtMap[word] = fileMap[word];
        } else {
          builtMap[word] = [];
        }
      });
      // at this point we have a built map containing indexes of each
      // word in our query string for our current file
      // so add it to our overall map index for files
      fileMapIndex[fileName] = builtMap;
      // repeat all steps for the next file in our filesName array
      // Yaay, I got it :)
    });
    // at the end return our file names array with contains or indexes
    // for each word in our query string
    return fileMapIndex;
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
    if (this.filesMap[fileName]) {
      return 'File Exists';
    }

    // Initialize a new map to hold indexes for this file
    const mapIndex = {};
    // start the map creation process
    booksArray.forEach((value, index) => {
      // get all the strings in this book
      const textArray = InvertedIndex.tokenize(InvertedIndex.getAllText(value));
      textArray.forEach((word) => {
        InvertedIndex.addWordToIndexMap(mapIndex, word, index);
      });
    });
    // add the created index to the map of all indexes
    this.filesMap[fileName] = mapIndex;
    return 'Index Created';
  }

  /**
  * Get the index map of a specific file name from the files map
  * @param {String} fileName - Name of file to search for
  * @return {Object} - An object containing the index of books in
  * the file or null if the file isn't in the index
  */
  getIndex(fileName) {
    // return the index map for the specific file
    // if it exists in our files map
    const fileIndex = {};
    if (this.filesMap[fileName]) {
      fileIndex[fileName] = this.filesMap[fileName];
      return fileIndex;
    }
    // return an empty Map
    return null;
  }


  /**
  * Helper method to add a word and its docID to an index
  * @param {Map} indexMap - Map to hold words and their indexes
  * @param {String} word - Word to be added to the indexMap
  * @param {Number} docId - ID of document in which the word exists
  * @return {Boolean} True if word was added to the index map or false otherwise
  */
  static addWordToIndexMap(indexMap, word, docId) {
    let returnValue = false;
    // check that this word hasn't been keyed
    if (indexMap[word] && indexMap[word].indexOf(docId) < 0) {
      // If it has been keyed just add a unique docId
      indexMap[word].push(docId);
      returnValue = true;
    } else {
      // create a new array to hold our doc ID
      const docIds = [];
      docIds.push(docId);
      indexMap[word] = docIds;
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
