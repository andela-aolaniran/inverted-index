'use strict'
//Inverted index class to hold all functionalities expected
class InvertedIndex{
  /**
  *Constructor for the inverted index class
  */
  constructor(){
    this.mapIndex = new Map() ;
    this.files = []; //array to hold list of files from the user

  }
  
  /**
   * Method to search for a particular string for now
   */
  searchIndex(query){
    let results = InvertedIndex.tokenize(query);
    let resultMap = new Map();
    for(var word of results){
      if(this.mapIndex.has(word) && !resultMap.has(word)){
        resultMap.set(word, this.mapIndex.get(word));
      }
    }
    return resultMap;
  }

  /**
  *Method to upload a book.json file
  */
  uploadFile(file){
    console.log("uploadFile called");
    var fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log("onLoad called");
      var parsedJson = JSON.parse(fileReader.result);
      //console.log(fileReader.result);
      //console.log(parsedJson);
      this.createIndex(parsedJson);
      for(var key of this.mapIndex.keys()){
        //console.log(`${key} Occurences(${[...this.mapIndex.get(key)]})`);
          //list.innerHTML += `<li><a href="#" onclick="shoutOut()">${key}</a></li>\n`;
      }
    };
    fileReader.readAsText(file);
  }

  /**
  *Method to get an array of all words in a particular text
  */
  static tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')//If it's not a space or a word remove it
      .split(/\s+/);//split by spaces of any length
  }

  /**
  *Method to get all text(text and title) in a specific book
  *@book 
  */
  static getAllText(book){
    return `${book.title} ${book.text}`;
  }

  /**
  *Method to add word to the mapIndex if it is unique
  *and also add it's docID.
  */
  addWordToIndex(docId, word){
    if(this.mapIndex.has(word)){//check that this word hasn't been keyed
      this.mapIndex.get(word).add(docId);//if it has been keyed just add a unique docId
    }else{
      this.mapIndex.set(word, new Set().add(docId)) ;//Use set for the docId to ensure it is unique
    }
  }

  /**
  *Method for building the index from the books json file
  */
  createIndex(booksArray){
    //1 start with first document (doc1)
    for(let i = 0; i < booksArray.length; i++){
      //get all the strings in this book
      let textArray = InvertedIndex.tokenize(InvertedIndex.getAllText(booksArray[i]));
      for(let word of textArray){
        this.addWordToIndex((i+1), word);
      }
    }
    return this.mapIndex ;
  }
}

//export default InvertedIndex;


var books = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];
/*
var invertedIndex = new InvertedIndex();
var map = invertedIndex.createIndex(books);
console.log(map);

//module.exports = InvertedIndex ;
/*for (var [key, value] of map) {
  console.log(key);
}

console.log(invertedIndex.searchIndex('rabbit'));
*/


