(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[]
},{}],3:[function(require,module,exports){
module.exports=[
  {
    "title": "hello world",
    "text": "No resources :)"
  },
  {
    "title": "hello world",
    "appResources": "No resources :)"
  }
]

},{}],4:[function(require,module,exports){
// Name of the bookfile
const books = require('../books.json');
const emptyBook = require('../empty_book.json');
const invalidBook = require('../invalid_book.json');

// create and instance of the InvertedIndex class
const invertedIndex = new InvertedIndex();
// book names
const fileName = 'myBooks';

describe('Read book Data:', () => {
  it('should read a book.json file and assert that it is not empty', () => {
    expect(invertedIndex.validateBook(emptyBook)).toEqual(false);
  });
  it(`should read a book.json file and assert 
    that it is wrongly formatted`, () => {
    expect(invertedIndex.validateBook(invalidBook)).toEqual(false);
  });
  it(`should read a book.json file and assert that it is
   correctly formatted`, () => {
    expect(invertedIndex.validateBook(books)).toEqual(true);
  });
});

describe('Populate Index', () => {
  beforeEach(() => {
    if (invertedIndex.validateBook(books)) {
      invertedIndex.createIndex(fileName, books);
    }
  });
  it(`verifies that the index is created once the JSON
    file has been read`, () => {
    expect(invertedIndex.getIndex([fileName], books))
      .toBeTruthy();
  });
});

describe('Search Index', () => {
  let searchResult = '';
  beforeEach(() => {
    searchResult = invertedIndex
      .searchIndex('alice in and elf man azeez', [fileName]);
  });
  it('searches the index and returns the right results', () => {
    expect(searchResult[fileName].alice).toEqual([0]);
    expect(searchResult[fileName].and).toEqual([0, 1]);
  });
  it(`searches the index and returns no results if the 
    search term isn't in the index`, () => {
    expect(searchResult[fileName].azeez).toEqual([]);
  });
});

},{"../books.json":1,"../empty_book.json":2,"../invalid_book.json":3}]},{},[4])