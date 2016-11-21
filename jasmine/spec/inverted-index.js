// Inverted index class to hold all functionalities expected
class InvertedIndex{
  /**
  *Constructor for the inverted index class
  */
  constructor() {
    // Map to hold word and a Set of documents they appear in
    this.mapIndex = new Map();
    // array to hold list of files from the user
    this.files = [];

    this.name='hello';
  }
  /**
   * Method to search for a particular string for now
   */
  searchIndex(query) {
    const tokens = InvertedIndex.tokenize(query);
    // Create a new map to hold results
    const resultMap = new Map();
    tokens.forEach((word) => {
      if (this.mapIndex.has(word) && !resultMap.has(word)) {
        resultMap.set(word, this.mapIndex.get(word));
      }
    });
    // Convert the result map to an array
    return Array.from(resultMap);
  }

  /**
  *Method to get an array of all words in a particular text
  */
  static tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '') // If it's not a space or a word remove it
      .split(/\s+/); // split by spaces of any length
  }

  /**
  *Method to get all text(text and title) in a specific book
  *@book 
  */
  static getAllText(book){
    // Concatenate the book title and text
    return `${book.title} ${book.text}`;
  }

  /**
  *Method to add word to the mapIndex if it is unique
  *and also add it's docID.
  */
  addWordToIndex(docId, word) {
    if (this.mapIndex.has(word)) { // check that this word hasn't been keyed
      this.mapIndex.get(word).add(docId); // If it has been keyed just add a unique docId
    } else {
      this.mapIndex.set(word, new Set().add(docId)); // Use Set for the docId to ensure it is unique
    }
  }

  /**
  *Method for building the index from the books json file
  */
  createIndex(booksArray) {
    // 1 start with first document (doc1)
    this.mapIndex.clear(); // Clear existing values when we want to create a new index
    booksArray.forEach((value, index) => {
      // get all the strings in this book
      const textArray = InvertedIndex.tokenize(InvertedIndex.getAllText(value));
      textArray.forEach((word) => {
        this.addWordToIndex((index), word);
      });
    });
    return Array.from(this.mapIndex);
  }
}
// export default InvertedIndex ;

