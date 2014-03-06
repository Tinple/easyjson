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
}

/**
 * Choose the JSON file at `jsonPath`
 * 
 * @param  {String} jsonPath 
 * @return {EasyJSON}
 * @api public
 */
EasyJSON.prototype.path = function (jsonPath) {
	if (!~jsonPath.indexOf('.json')) {
		jsonPath += '.json';
	}
	this.jsonPath = jsonPath;
	return this;
}

/**
 * Return the content of JSON
 * @return {[String]}
 */
EasyJSON.prototype.read = function () {
	return fs.readFileSync(this.jsonPath, 'utf8');
};

/**
 * Express the JSON
 * @return {EasyJSON} 
 */
EasyJSON.prototype.express = function () {
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
		obj = JSON.parse(chunk);

	if (typeof under === 'undefined') {
		obj[key] = val;
		this.write(obj);
	} else {
		if (typeof obj[under] === 'object') {
			obj[under][key] = val;
			this.write(obj);
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
		obj;

	obj = JSON.parse(chunk, function (key, val) {
		if (key === keyToDel) {
			return undefined;
		}
		return val;
	});
	this.write(obj);
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
		obj;

	obj = JSON.parse(chunk, function (key, val) {
		if (key === keyToChange) {
			return valToChange;
		}
		return val;
	});
	this.write(obj);
	return this;
}

/**
 * Write the updated data to JSON file
 * @param  {String} data 
 * @return {EasyJSON}      
 */
EasyJSON.prototype.write = function (data) {
	fs.writeFileSync(this.jsonPath, this.beauty(data));
	return this;
}

/**
 * Get the value of specific JSON item
 * @param  {String} keyToGet 
 * @param  {String} under    get item under specific location
 * @return {String}          return EasyJSON if get failed
 */
EasyJSON.prototype.get = function (keyToGet, under) {
	var chunk = this.read(),
		obj = JSON.parse(chunk);

	if (typeof under === 'undefined') {
		return obj[keyToGet];
	} else {
		if (typeof obj[under] === 'object') {
			return obj[under][keyToGet];
		}
	}
	return this;
	
}

/**
 * Format the JSON data
 * @param  {Object} obj 
 * @return {String}     
 */
EasyJSON.prototype.beauty = function (obj) {
	return JSON.stringify(obj, null, 4)
}