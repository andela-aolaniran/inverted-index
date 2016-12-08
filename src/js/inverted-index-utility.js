/**
* Class to holding helper functions
* for InvertedIndex class
*/
class InvertedIndexUtility {
  /**
  * Method to get an array of all words in a particular text
  * @param {String} text - String to be normalized and tokenized
  * @return {Array} - An array containing all texts in a string
  */
  static tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '') // If it's not a space/word/alphabet remove it
      .split(/\s+/); // split by spaces of any length
  }
}
