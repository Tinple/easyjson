var easyjson = require('../');

// get a item from test.json file
var author = easyjson.path('test')
					 .get('author');

console.log(author);