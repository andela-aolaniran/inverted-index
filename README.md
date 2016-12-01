# inverted-index
[![Build Status](https://travis-ci.org/andela-aolaniran/inverted-index.svg?branch=development)](https://travis-ci.org/andela-aolaniran/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-aolaniran/inverted-index/badge.svg?branch=development)](https://coveralls.io/github/andela-aolaniran/inverted-index?branch=development)

### Inverted Index
An inverted index (also referred to as postings file or inverted file) is an index data structure storing a mapping from content, such as words or numbers, to its locations in a database file, or in a document or a set of documents (named in contrast to a Forward Index, which maps from documents to content). The purpose of an inverted index is to allow fast full text searches, at a cost of increased processing when a document is added to the database.

### How to use
  - Open your browser and visit the [homepage]
  - Upload valid json book files
  - Select an uploaded book file from the selector and click create index
  - The index for the file is shown in tabular format with a search input field and search files selector
  - Search for a text or sequence of text in a selected file or all files (from the selector)
  - Click the search button and wait for the search results to be displayed

### Key Features
 - Full text search
 - Create index for multiple files
 - Search through all created indexes or specific index (Multiple Search)
 - Index for each file is created only once and stored in memory

### Technologies
inverted-index is implemented using a number of technologies:
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [karma] - to automate testing
* [jasmine] - for writing the tests

### Limitations
  - It doesn't save a search session
  - Files must have a specific structure for index to be created

### Development
Want to contribute? Great!
inverted-index uses Gulp to speed up development proces
Make a change in your file and instantanously see your updates!
(Note that you must have node and npm installed)
Open your favorite Terminal and run these commands.

First Tab:
```sh
$ npm install
```
Second Tab:
```sh
$ gulp src_files_watcher
```

Third Tab:
```sh
$ gulp spec_files_watcher
```

License
----

MIT

   [homepage]: <https://aolaniran-inverted-index.herokuapp.com/>
   [git-repo-url]: <https://github.com/andela-aolaniran/inverted-index.git>
   [karma]: <https://karma-runner.github.io/>
   [jasmine]: <https://jasmine.github.io/>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
