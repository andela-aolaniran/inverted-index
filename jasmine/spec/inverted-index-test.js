//const invertedIndex = new InvertedIndex();
const book = [
  {
    'title': 'Alice in Wonderland',
    'text': 'Alice falls into a rabbit hole and enters a world full of imagination.'
  },

  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
];
const invertedIndex = new InvertedIndex();

describe('Read book Data:', () => {
  beforeEach(() => {
    invertedIndex.createIndex(book);
  });
  it('should read a json file and assert that it is not empty', () => {
    expect(invertedIndex.createIndex([])).toEqual([]);
    expect(invertedIndex.createIndex({})).toequal([]);
  });
});

describe('Populate Index', () => {
  beforeEach(() => {
    invertedIndex.createIndex(book);
  });
  it('should map string keys to the correct objects', () => {
    expect(Array.from(invertedIndex.getIndex()[30][1])[0]).toEqual(1);
    expect(Array.from(invertedIndex.getIndex()[0][1])[0]).toEqual(0);
  });
});

describe('Search Index', () => {
  beforeEach(() => {
    invertedIndex.createIndex(book);
  });
  it('searching the index returns an array of the indices of the correct objects that contain the words in the search query', () => {
    const searchResult = invertedIndex.searchIndex('alice in and elf man');
    expect(searchResult[0][0]).toEqual('alice');
    expect(searchResult[3][0]).toEqual('elf');
    expect(Array.from(searchResult[4][1])[0]).toEqual(1);
  });
});

