//const invertedIndex = new InvertedIndex();
const invertedIndex = require(../../src/js/inverted-index);
const bookFile = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]


describe("Read book Data:", function() {
  

  it("should read a json file and assert its not empty", function() {
    expect(invertedIndex.readBookFile([])).toBe(false);
  });
});

describe("Populate Index:", function() {
  beforeEach(function() {
    invertedIndex.readBookFile(bookFile);
  });

  it("index is created once JSON file has been read", function() {
    expect(invertedIndex.indexMap).toBeDefined();
  });

  it("index should map string keys to the correct objects in the JSON array", function(){
    let values = invertedIndex.mapIndex.get('Alice') ;
    expect(values.has(1)).tobe(true);
  });

});

describe("Search index:", function() {

  it("searching the index returns an array of the indices of the correct objects that contain the words in the search query.", function() {
    let result = invertedIndex.search('and');
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).tobe(true);
  });
});