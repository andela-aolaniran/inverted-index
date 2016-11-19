angular.module('invertedIndexModule', []).
controller('invertedIndexController', function main_controller(){
	this.invertedIndex = new InvertedIndex();
	this.books = books ;
	this.searchResult ;
	this.showIndexTable = true ;
	this.showQueryTable = false ;
	this.createdIndex = [...this.invertedIndex.createIndex(books)];//convert map to an array
	this.headerArray = [...Array(books.length).keys()]
	
	this.search = (queryString) =>{
		this.searchResult = [...this.invertedIndex.searchIndex(queryString)];
	};
});