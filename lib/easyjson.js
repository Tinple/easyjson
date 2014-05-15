/**
 * Module dependencies
 */

var fs = require('fs');

/**
 * Expose `EasyJSON`.
 */
exports = module.exports = new EasyJSON;

/**
 * Object#toString()
 */
var toString = Object.prototype.toString;

/**
 * Array#isArray shim
 */
var isArray = Array.isArray || function (arr) {
	return toString.call(arr) == '[object Array]';
}
/**
 * isNumber shim
 */
var isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

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
 * add datas to json file, support nested data
 * @param {[String]} str   
 * @param {[Object]} value 
 * @param {[Number]} index 
 * @return{EasyJSON} [description]
 */
EasyJSON.prototype.add = function (str, value, index) {
	var chunk = this.read(),
		obj = JSON.parse(chunk),
		nest = this.getNested(str),
		pre = this.getPre(str)[0],
		ret,
		gene,
		exist;
	
	if (typeof this.get(str) === 'undefined') {
		if (nest.length === 0) {
			obj[str] = value;
		} else if (nest.length === 1) {
			if (typeof this.get(pre) === 'undefined') {
				isNumber(nest[0][0]) ? obj[pre] = [value] : (obj[pre] = {}, obj[pre][nest[0][0]] = value);
			} else {
				(isArray(this.get(pre))) ? obj[pre].splice(nest[0][0], 0, value) : obj[pre][nest[0][0]] = value; 
			}
		} else {
			if (typeof this.get(pre) === 'undefined') {
				isNumber(nest[nest.length - 1][0]) ? ret = [value] : (ret = {}, ret[nest[nest.length - 1][0]] = value);				
				for (var i = nest.length - 2; i >= 0; --i) {	
					if (isNumber(nest[i][0])) {
						gene = [];
						gene.splice(nest[i][0], 0, ret);
						ret = gene;
					} else {
						gene = {};
						gene[nest[i][0]] = ret;
						ret = gene;
					}
				}
				obj[pre] = ret;
			} else {
				for (var i = nest.length - 2; i >= 0; --i) {
					str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
					if (typeof this.get(str) !== 'undefined') {
						exist = i;
						break;
					} else {
						continue;
					}
				}
				if (typeof exist === 'undefined') exist = -1;
				ret = value;
				for (var i = nest.length - 1; i > exist + 1; --i) {
					if (isNumber(nest[i][0])) {
						gene = [];
						gene.splice(nest[i][0], 0, ret);
						ret = gene;
					} else {
						gene = {};
						gene[nest[i][0]] = ret;
						ret = gene;
					}
				}
				e_ret = this.get(str);
				if (typeof e_ret === 'undefined') {
					obj[pre][nest[0][0]] = ret;
				} else {
					isArray(e_ret) ? e_ret.splice(nest[exist + 1][0], 0, ret) : e_ret[nest[exist + 1][0]] = ret;
					for (var i = exist; i >= 0; --i) {
						// aaa[bbb][ccc] => aaa[bbb]
						str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')		
						ret = this.get(str);
						ret[nest[i][0]] = e_ret;
						e_ret = ret;
					}
					obj[pre] = e_ret;
				}	
			}
		}
	} else if (isArray(this.get(str))) {	// push the value to array
		if (nest.length === 0) {
			(typeof index === 'undefined') ? obj[pre].push(value) : obj[pre].splice(index, 0, value);			 
		} else if (nest.length === 1) {
			parse = this.get(pre);
			(typeof index === 'undefined') ? parse[nest[0][0]].push(value) : parse[nest[0][0]].splice(index, 0, value);
			obj[pre] = parse;
		} else {
			str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
			parse = this.get(str);
			(typeof index === 'undefined') ? parse[nest[nest.length - 1][0]].push(value) : parse[nest[nest.length - 1][0]].splice(index, 0, value);
			for (var i = nest.length - 2; i >= 0; --i) {
				str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
			
				ret = this.get(str);
				ret[nest[i][0]] = parse;
				parse = ret;
			}
			obj[pre] = parse;	
		}
	} else {
		console.log('key has already exist!')
	}

	this.write(obj);
	return this;
}

/**
 * Delete the specific JSON item,support nested data
 * @param  {String} keyToDel 
 * @return {EasyJSON}          
 */
EasyJSON.prototype.del = function (str) {
	var chunk = this.read(),
		obj = JSON.parse(chunk),
		nest = this.getNested(str),
		pre = this.getPre(str)[0],
		ret;

	if (nest.length === 0) {
		obj = JSON.parse(chunk, function (key, val) {
			if (key === str) {
				return undefined;
			} 
			return val;
		});
	} else if (nest.length === 1) {
		parse = this.get(pre);
		if (isArray(parse)) {
			parse.splice(nest[0][0], 1);
		} else {
			delete parse[nest[0][0]]
		}
		obj[pre] = parse;

	} else {
		str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
		parse = this.get(str);
		if (isArray(parse)) {
			parse.splice(nest[nest.length - 1][0], 1);
		} else {
			delete parse[nest[nest.length - 1][0]]
		}

		for (var i = nest.length - 2; i >= 0; --i) {
			str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
		
			ret = this.get(str);
			ret[nest[i][0]] = parse;
			parse = ret;
		}
		obj[pre] = parse;	
	}

	this.write(obj);
	return this;

}

/**
 * Modify the value of specific JSON item, support nested data
 * @param  {String} keyToChange 
 * @param  {String} valToChange
 * @return {EasyJSON}            
 */
EasyJSON.prototype.modify = function (str, value) {
	var chunk = this.read(),
		obj = JSON.parse(chunk),
		nest = this.getNested(str),
		pre = this.getPre(str)[0],
		ret;

	if (nest.length === 0) {
		obj = JSON.parse(chunk, function (key, val) {
			if (key === str) {
				return value;
			}
			return val;
		});
	} else if (nest.length === 1) {
		parse = this.get(pre);
		parse[nest[0][0]] = value;
		obj[pre] = parse;
	} else {
		str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')
		parse = this.get(str);
		parse[nest[nest.length - 1][0]] = value
		for (var i = nest.length - 2; i >= 0; --i) {
			str = str.replace(/\[[a-zA-Z_$][a-zA-Z0-9_$]*\]$|\[0\]$|\[[1-9]+[0-9]*\]$/,'')		
			ret = this.get(str);
			ret[nest[i][0]] = parse;
			parse = ret;
		}
		obj[pre] = parse;	
	}

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
 * @param  {String} str 
 * @return {String}          
 */
EasyJSON.prototype.get = function (str) {
	var chunk = this.read(),
		obj = JSON.parse(chunk);

	var nest = this.getNested(str);
	var pre = this.getPre(str)[0];
	var ret;
	if (nest.length === 0) {
		return obj[str];
	} else {
		ret = obj[pre];
		for (var i = 0; i < nest.length; ++i) {
			if (typeof ret === 'undefined') {
				return undefined;
			} else if (i != nest.length - 1) {
				ret = ret[nest[i][0]];
			} else {
				return ret[nest[i][0]];
			}
			
		}
	}
}

/**
 * Format the JSON data
 * @param  {Object} obj 
 * @return {String}     
 */
EasyJSON.prototype.beauty = function (obj) {
	return JSON.stringify(obj, null, 4)
}

/**
 * Get the nested data. aaa[bbb][ccc] => [['bbb',index:3,input:'aaa[bbb][ccc]'],['ccc',index:8,input:'aaa[bbb][ccc]']]
 * @param  {[String]} str nested data
 * @return {[Array]}     
 */
EasyJSON.prototype.getNested = function (str) {
	var reg = /\[[a-zA-Z_$][a-zA-Z0-9_$]*\]|0|[1-9]+[0-9]*/g;
	var brace = [];
	var ret;
	while ((ret = reg.exec(str)) !== null) {
		if (/\[/.test(ret[0])) {
			ret[0] = ret[0].substr(1, ret[0].length - 2);
		}
		brace.push(ret);
	}
	return brace;
}

/**
 * Get the prefix of nested data. aaa[bbb][ccc] => aaa
 * @param  {[String]} str 
 * @return {[Array]}     
 */
EasyJSON.prototype.getPre = function (str) {
	var reg = /^[a-zA-Z_$][a-zA-Z0-9_$]*/;
	var ret = reg.exec(str);
	return ret;
}