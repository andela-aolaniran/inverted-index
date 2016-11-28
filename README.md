# inverted-index
[![Build Status](https://travis-ci.org/andela-aolaniran/inverted-index.svg?branch=development)](https://travis-ci.org/andela-aolaniran/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-aolaniran/inverted-index/badge.svg?branch=master)](https://coveralls.io/github/andela-aolaniran/inverted-index?branch=master) [![Code Climate](https://codeclimate.com/github/andela-aolaniran/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-aolaniran/inverted-index) [![Issue Count](https://codeclimate.com/github/andela-aolaniran/inverted-index/badges/issue_count.svg)](https://codeclimate.com/github/andela-aolaniran/inverted-index)
### Inverted Index
An inverted index (also referred to as postings file or inverted file) is an index data structure storing a mapping from content, such as words or numbers, to its locations in a database file, or in a document or a set of documents (named in contrast to a Forward Index, which maps from documents to content). The purpose of an inverted index is to allow fast full text searches, at a cost of increased processing when a document is added to the database.

### Usage
  - open terminal and navigate into the folder you want inverted-index installed and run the following commands [You must have node and npm installed]
    ```
    $ git clone https://github.com/andela-aolaniran/inverted-index.git
    $ cd inverted-index
    $ npm install
    $ npm start
    ```
  - the inverted-index app is is loaded in your browser (optionally, open your browser and go to http://localhost:3013).
  - click the upload button and select valid book json files.
  - select the file the the selector by the left of the Create Index button
  - click create index button to have an index built for the selected file
  - the built index is displayed, with the search option
  - enter your search words to see if they exist in a specific index or all indexes
  - click the search button (button with a microscope icon) and the results would be displayed
### Features
 - Full text search
 - Create index for multiple files
 - Search through all created indexes or specific index (Multiple Search)
 - Index for each is created only once and stored in memory
### Technologies

inverted-index is implemented using a number of technologies:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [karma] - to automate testing
* [jasmine] - for writing the tests

License
----

MIT

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
