// Name of the bookfile
const fileName = 'myBooks';
const fileName2 = 'yourBooks';

// create and instance of the InvertedIndex class
const invertedIndex = new InvertedIndex();

describe('Read book Data:', () => {
  it('should read a json file and assert that it is not empty', () => {
    expect(invertedIndex.readBook(empty_book)).toEqual(false);
    expect(invertedIndex.readBook()).toEqual(false);
  });
});

describe('Populate Index', () => {
  beforeEach(() => {
    if(invertedIndex.readBook(books)){
      invertedIndex.createIndex(fileName, books);
    }
  });
  it(`verifies that the index is created once the JSON
    file has been read`, () => {
    expect(invertedIndex.getIndex([fileName], books))
      .toBeTruthy();
    expect(invertedIndex.getIndex([fileName2], books_2))
      .toBeTruthy();
  });
});

describe('Search Index', () => {
  let searchResult = '';
  beforeEach(() => {
    invertedIndex.createIndex(fileName, books);
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
