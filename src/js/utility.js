/**
* Class to holding helper functions
* for InvertedIndex class
*/
class Utility {
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
    return `${book.title} ${book.text}`;
  }

  /**
  * Helper method to add a word and its documentIndex to an index
  * @param {Map} fileIndex - Map to hold words and their indexes
  * @param {String} word - Word to be added to the fileIndex
  * @param {Number} documentIndex - ID of document in which the word exists
  * @return {Boolean} True if the word was added to the index map
  * or false otherwise
  */
  static addWordToFileIndex(fileIndex, word, documentIndex) {
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
