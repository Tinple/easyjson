var easyjson = require('../');

// add json item to test.json file
easyjson.path('test')
		.add('license', 'MIT')
		.express()
		.add('blog', 'http://tinple.me', 'author')
		.express();