//const invertedIndex = new InvertedIndex();
describe('Read book Data:', function() {
    let invertedIndex = new InvertedIndex();
	it('should read a json file and assert its not empty', function() {
  
		expect(invertedIndex.name).toBe('hello');
	});
});