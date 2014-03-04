var fs = require('fs');

module.exports = EasyJSON;

function EasyJSON() {
	if (!(this instanceof EasyJSON)) {
		return new EasyJSON;
	}
	this.datas = [];
	this.plugins = [];
}

EasyJSON.prototype.read = function (path) {
	this.path = path;
	if (!~path.indexOf('.json')) {
		path += '.json';
	}
	return this.express(fs.readFileSync(path, 'utf8'));
};

EasyJSON.prototype.express = function (str) {
	if (typeof str !== 'string') {
		str = JSON.stringify(str);
	}


}

EasyJSON.prototype.parse = function () {

}

EasyJSON.prototype.add = function (json) {

}

EasyJSON.prototype.del = function (json) {

}

EasyJSON.prototype.modify = function () {

}

EasyJSON.prototype.use = function (fn) {
	this.plugins.push(fn);
	return this;
}