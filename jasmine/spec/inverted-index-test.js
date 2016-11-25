const book = [
  {
    title: 'Alice in Wonderland',
    text: `Alice falls into a rabbit hole and enters
     a world full of imagination.`
  },

  {
    title: 'The Lord of the Rings: The Fellowship of the Ring.',
    text: `An unusual alliance of man, elf, dwarf,
      wizard and hobbit seek to destroy a powerful ring.`
  }
];
const book2 = [
  {
    title: 'Azeez is good',
    text: `Wow, being Alive is cool. An opportunity
      to create something that could possibly outlive me`
  }
];

// Name of the bookfile
const fileName = 'myBooks';
const fileName2 = 'yourBooks';

// create and instance of the InvertedIndex class
const invertedIndex = new InvertedIndex();

describe('Read book Data:', () => {
  it('should read a json file and assert that it is not empty', () => {
    expect(invertedIndex.createIndex(fileName, [])).toEqual('Invalid File');
  });
});

describe('Populate Index', () => {
  beforeEach(() => {
    invertedIndex.createIndex(fileName, book);
  });
  it(`verifies that the index is created once the JSON
    file has been read`, () => {
    expect(invertedIndex.getIndex(fileName, book))
      .toBeTruthy();
    expect(invertedIndex.getIndex(fileName2, book2))
      .toBeFalsy();
  });
});

describe('Search Index', () => {
  beforeEach(() => {
    invertedIndex.createIndex(book);
  });
  it('searches the index and returns the right results', () => {
    const searchResult = invertedIndex
      .searchIndex('alice in and elf man azeez', [fileName]);
    expect(searchResult[fileName].alice).toEqual([0]);
    expect(searchResult[fileName].and).toEqual([0, 1]);
    expect(searchResult[fileName].azeez).toEqual([]);

  });
});

