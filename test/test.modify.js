var easyjson = require('../');

// modify a item to test.json file
easyjson.path('test')
		.modify('project', 'EasyJSON')
		.express();