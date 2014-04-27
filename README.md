# easyjson

  tiny node.js module to manipulate JSON file with add/delete/modify/get json data easily.Support manipulate nested datas.

## Installation

```
$ npm install easyjson
```

## Attention
  Some new features like support nested datas is still under
  development. Will be implemented soon.

## EasyJSON

  With `EasyJSON` you can simply invoke the exported function to manipulate JSON file.
  At first, passing a path to `path` function to choose JSON file. And `EasyJSON` support the chain call.

Example app.js:

```js
var easyjson = require('easyjson');

// it should output your JSON file
easyjson.path('test')
		.express();
```

  You can also add, modify or delete a item with your JSON file. And `EasyJSON` support chained invoke.

```js
var easyjson = require('easyjson');

easyjson.path('test')
		.add('license', 'MIT')
		.express()
		.add('blog', 'http://tinple.me')  
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

## Most Useful(support nested)

  Actually, `EasyJSON` support nested data, that means you
  can manipulate your JSON file most effectivly. 

```js
var easyjson = require('easyjson').path('test');

/**
 * "author": {
 *      "name": "Tinple",
 *  	"email": "htinple@gmail.com",
 * 		"friend": {
 *			"name": "Kristine"
 *		}
 *  }
 */
easyjson.add('author[friend][name]', 'Kristine');

/**
 * push 'path.json' to existed array files
 * "files": ["index.js", "path.json"]
 */
easyjson.add('files', 'path.json');

// it will delete whole friend object, the same as array
easyjson.del('author[friend]');

// modify the `path.json` key in files, the same as obj
easyjson.modify('files[path.json]', 'path2.json');

// array also support index and has high priority
// "files": [1, 2] => "files": [1, 1]
easyjson.modify('files[1]', '1');
```

## Warning
  `EasyJSON` will throw an error when you pass a nonexistent
  key to `modify()` and `del()`. As for `add(key, value)`, `EasyJSON` will judge whether the key exists firstly. If not,
  it will added normally. 

  If it has already existed, there are two situations that
  the key should be treated. 

  1. The key is an array, then the value will be pushed.
  2. The key is other type, like Object or String, then throw
     an error.

## License

MIT