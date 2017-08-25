# easyjson

  Tiny node.js module to manipulate JSON file with add/delete/modify/get json data easily. Also support nested datas.

## Installation

```
$ npm install easyjson
```

Or

```
$ component install Tinple/easyjson
```

## EasyJSON

  With `EasyJSON` you can simply invoke the exported function to manipulate JSON file.
  At first, passing a path to `path` function to choose a JSON file. And `EasyJSON` support the chain call.

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

## Most Useful(support nested data)

  Actually, `EasyJSON` support nested data, that means you
  can manipulate your JSON file most effectivly. 

```js
var easyjson = require('easyjson').path('test');

/**
 * "author": {
 *      "name": "Tinple"
 * }
 * ==>
 * "author": {
 *      "name": "Tinple",
 *    "friend": {
 *      "name": "Kristine"
 *    }
 *  }
 */
easyjson.add('author[friend][name]', 'Kristine');

/**
 * push 'path.json' to existed array files
 * "files": ["index.js"]
 * ==>
 * "files": ["index.js", "path.json"]
 */
easyjson.add('files', 'path.json');

// it will delete whole friend object, the same as array
easyjson.del('author[friend]');

// modify the array, only index support
easyjson.modify('files[1]', 'path2.json');

// modify the obj key
easyjson.modify('author[friend][name]', 'Panda');

/** More complex
 * "author": {
 *      "name": "Tinple"
 * }
 * ==>
 * "author": {
 *      "name": "Tinple",
 *    "friend": [{
 *      "name": "Kristine"
 *    }]
 *  }
 */
easyjson.add('author[friend][0][name]', 'Kristine');
```

## Simpler examples

   to get started:

```js
// string
easyjson.add('stringKey', 'stringValue');

// object
easyjson.add('objectKey[objectSubkey1]', 'ok');
easyjson.add('anotherObjectKey[objectSubkey1]', 'ok');
// --
easyjson.add('yetAnotherObjectKey[objectSubkey1]', 'ok');
easyjson.del('yetAnotherObjectKey[objectSubkey1]');
easyjson.del('yetAnotherObjectKey');
// --
easyjson.add('keyA[keyB][keyC]', 'ok');
easyjson.modify('keyA[keyB][keyC]', 'ok2');
// --

// arrays
easyjson.add('arrayKey[0][arraySubkey1]', 'ok');
easyjson.add('arrayKey[1][arraySubkey1]', 'ok');
easyjson.add('anotherArrayKey[0][arraySubkey1]', 'ok');
// --
easyjson.add('yetAnotherArrayKey[0][arraySubkey1]', 'ok2');
easyjson.del('yetAnotherArrayKey[0][arraySubkey1]');
easyjson.del('yetAnotherArrayKey[0]');
easyjson.del('yetAnotherArrayKey');
// --
easyjson.add('keyArrA[0][keyArrB][0][keyArrC]', 'ok');
easyjson.modify('keyArrA[0][keyArrB][0][keyArrC]', 'ok2');
// --

/**
 * {
 *     "stringKey": "stringValue",
 *     "objectKey": {
 *         "objectSubkey1": "ok"
 *     },
 *     "anotherObjectKey": {
 *         "objectSubkey1": "ok"
 *     },
 *     "keyA": {
 *         "keyB": {
 *             "keyC": "ok2"
 *         }
 *     },
 *     "arrayKey": [
 *         {
 *             "arraySubkey1": "ok"
 *         },
 *         {
 *             "arraySubkey1": "ok"
 *         }
 *     ],
 *     "anotherArrayKey": [
 *         {
 *             "arraySubkey1": "ok"
 *         }
 *     ],
 *     "keyArrA": [
 *         {
 *             "keyArrB": [
 *                 {
 *                     "keyArrC": "ok2"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */
 
```



## Warning
  `EasyJSON` will do nothing when you pass a nonexistent
  key to `modify()` and `del()`. As for `add(key, value)`, `EasyJSON` will judge whether the key exists firstly. If not, it will added normally. 

  If it has already existed, there are two situations that
  the key should be treated. 

  1. The key is an array, then the value will be pushed.
  2. The key is other type, like Object or String, then `EasyJSON` do nothing.

## License

MIT
