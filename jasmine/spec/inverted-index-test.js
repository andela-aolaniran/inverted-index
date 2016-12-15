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
