var easyjson = require('../');

// get a item from test.json file
var author = easyjson.path('test')
					 .get('author');

var email = easyjson.path('test')
					.get('email', 'author');

console.log(author);
console.log(email);