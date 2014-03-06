# easyjson

  tiny node.js module to manipulate JSON file with add/delete/modify/get json data easily.

## Installation

```
$ npm install easyjson
```

##EasyJSON

  With `EasyJSON` you can simply invoke the exported function to manipulate JSON file.
  At first, passing a path to `path` function to choose JSON file. And `EasyJSON` support
  the chain call.

Example app.js:

```js
var easyjson = require('easyjson');

easyjson.path('test')
		.express();
```

  You can also add, modify or delete a item with your JSON file.

```js
var easyjson = require('easyjson');

easyjson.path('test')
		.add('license', 'MIT')
		.express()
		//specify blog is under author which is a object 
		.add('blog', 'http://tinple.me', 'author')  
		.express()
		.del('version')
		.express()
		.modify('project', 'EasyJSON')
		.express();
```

  `easyjson` can get the value of your item with JSON file. Just call `get(key)` to get it.

```js
var easyjson = require('easyjson'),
	author = easyjson.path('test').get('author'),
	email = easyjson.path('test').get('email');
```

## License

MIT