/**
 * Module dependencies
 */

var fs = require('fs');

/**
 * Expose `EasyJSON`.
 */
exports = module.exports = new EasyJSON;

/**
 * Initialize a new `EasyJSON`.
 * 
 * @api public
 */
function EasyJSON() {
	if (!(this instanceof EasyJSON)) {
		return new EasyJSON;
	}
	this.datas = [];
	this.plugins = [];
}

/**
 * Choose the JSON file at `path`
 * 
 * @param  {String} path 
 * @return {EasyJSON}
 * @api public
 */
EasyJSON.prototype.path = function (path) {
	if (!~path.indexOf('.json')) {
		path += '.json';
	}
	this.path = path;
	return this;
}

/**
 * Return the content of JSON
 * @return {[String]}
 */
EasyJSON.prototype.read = function () {
	return fs.readFileSync(this.path, 'utf8');
};

/**
 * Express the JSON
 * @return {EasyJSON} 
 */
EasyJSON.prototype.express = function () {
	// unfinished
	console.log(this.read());
	return this;
}

/**
 * Add the item to JSON
 * @param {String} key   key of added item
 * @param {String} val   value of added item
 * @param {String} under add item under specific location
 * @return {EasyJSON}
 */
EasyJSON.prototype.add = function (key, val, under) {
	var chunk = this.read(),
		self = this,
		add = JSON.parse(chunk);

	if (typeof under === 'undefined') {
		add[key] = val;
		this.write(JSON.stringify(add));
	} else {
		if (typeof add[under] === 'object') {
			add[under][key] = val;
			this.write(JSON.stringify(add));
		}
	}
	
	return this;
}

/**
 * Delete the specific JSON item
 * @param  {String} keyToDel 
 * @return {EasyJSON}          
 */
EasyJSON.prototype.del = function (keyToDel) {
	var chunk = this.read(),
		self = this,
		obj;
	obj = JSON.parse(chunk, function (key, val) {
		if (key === keyToDel) {
			return undefined;
		}
		return val;
	});
	this.write(JSON.stringify(obj));
	return this;
}

/**
 * Modify the value of specific JSON item
 * @param  {String} keyToChange 
 * @param  {String} valToChange
 * @return {EasyJSON}            
 */
EasyJSON.prototype.modify = function (keyToChange, valToChange) {
	var chunk = this.read(),
		self = this,
		obj;
	obj = JSON.parse(chunk, function (key, val) {
		if (key === keyToChange) {
			return valToChange;
		}
		return val;
	});
	this.write(JSON.stringify(obj));
	return this;
}

/**
 * Write the updated data to JSON file
 * @param  {String} data 
 * @return {EasyJSON}      
 */
EasyJSON.prototype.write = function (data) {
	fs.writeFileSync(this.path, data);
	return this;
}

EasyJSON.prototype.toString = function (str) {
	if (typeof str !== 'string') {
		return JSON.stringify(str);
	}
	return str;
}

EasyJSON.prototype.use = function (fn) {
	this.plugins.push(fn);
	return this;
}

EasyJSON.prototype.parse = function (str) {

}