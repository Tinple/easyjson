var easyjson = require('../');

// add json item to test.json file
easyjson.path('test')
		.add('license', 'MIT')
		.express()
		//specify blog is under author which is a object
		.add('blog', 'http://tinple.me', 'author')
		.express();