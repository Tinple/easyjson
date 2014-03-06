var easyjson = require('../');

// delete a item to test.json file
easyjson.path('test')
		.del('version')
		.express();