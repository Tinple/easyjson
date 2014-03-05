var easyjson = require('../');

easyjson.path('test')
		.express()
		.del('version')
		.express()
		.modify('project', 'EasyJSON')
		.express()
		.add('license', 'MIT')
		.express()
		.add('blog', 'http://tinple.me', 'author')
		.express()