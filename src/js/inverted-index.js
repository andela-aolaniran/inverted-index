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
    const tokens = InvertedIndexUtility.tokenize(query);
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
    if (this.fileIndexes[fileName]) {
      return 'Index Already Exists';
    }

    const fileIndex = {};
    books.forEach((value, index) => {
      const words = InvertedIndexUtility.tokenize(this.getAllText(value));
      words.forEach((word) => {
        this.addWordToFileIndex(fileIndex, word, index);
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
  validateBook(books) {
    // check that is an array and not empty
    let bookValid = (Array.isArray(books) && books.length > 0);
    if (!bookValid) {
      return false;
    }
    books.forEach((book) => {
      // if anybook is invalid in the list of books
      // then the books file is invalid
      if (!book.title || !book.text) {
        bookValid = false;
      }
    });
    return bookValid;
  }

  /**
  * Method to get all text(text and title) in a specific book
  * @param {Object} book - book object from which
  * we want to extract all text (title and text)
  * @return {String} - a string containing all texts in the book
  */
  getAllText(book) {
    return `${book.title} ${book.text}`;
  }

  /**
  * Method to add a word and its documentIndex to an index
  * @param {Map} fileIndex - Map to hold words and their indexes
  * @param {String} word - Word to be added to the fileIndex
  * @param {Number} documentIndex - ID of document in which the word exists
  * @return {Boolean} True if the word was added to the index map
  * or false otherwise
  */
  addWordToFileIndex(fileIndex, word, documentIndex) {
    let returnValue = false;
    if (fileIndex[word] && fileIndex[word].indexOf(documentIndex) < 0) {
      fileIndex[word].push(documentIndex);
      returnValue = true;
    } else {
      const documentIndexes = [];
      documentIndexes.push(documentIndex);
      fileIndex[word] = documentIndexes;
      returnValue = true;
    }
    return returnValue;
  }
}
