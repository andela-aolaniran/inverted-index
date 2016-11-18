var books = [{
  "title": "Alice in Wonderland",
  "text": "Alice falls into a rabbit hole and enters a world full of imagination."
}, {
  "title": "The Lord of the Rings: The Fellowship of the Ring.",
  "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
}];

angular.module('InvertedIndex', []).
controller('main_controller', function main_controller(){
	this.name = '';
	this.math = new InvertedIndex();
	this.indexFiles = '';
	this.name = this.math.name ;
	this.queryResultLength = 0;
	this.createIndex = () =>{
		let index = this.math.createIndex(books)
		for (var [key, value] of index) {
  			console.log(key + " : " + [...value]);
		}
      console.log('word exists');
		this.indexFiles = index.size;
	}

	this.searchIndex = (query) =>{
		console.log("searchIndex called :" + query);
		console.log(query + " : " + [...this.math.searchIndex(query)]);
		this.queryResultLength = this.math.searchIndex(query).size;
	}
});