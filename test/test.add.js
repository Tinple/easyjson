var easyjson = require('../');

// add json item to test.json file
easyjson.path('test')
		.add('license', 'MIT')
		.express()
		//the third argument specify where you add
		.add('blog', 'http://tinple.me', 'author')
		.express();