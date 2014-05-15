var should = require('should'),
	easyjson = require('../');

describe('easy json', function () {
	path = easyjson.path('./test');
	
	it('Should get a item', function (done) {
		var version = path.get('version'),
			email = path.get('author[contact][email]');
		version.should.equal('0.1.1');
		email.should.equal('htinple@gmail.com');
		done();
	});

	it('Should perform narmally with getNested() and getPre()', function (done) {

		var nest = path.getNested('author[pet][0][name]'),
			pre = path.getPre('author[pet][1][name]');
		nest.should.be.instanceof(Array).and.have.lengthOf(3);
		nest[0][0].should.equal('pet');
		pre.should.be.instanceof(Array).and.have.lengthOf(1);
		pre[0].should.equal('author');
		done();
	});

	it('Should delete a item', function (done) {
		path.del('repo');
		JSON.parse(path.read()).should.not.have.property('repo');
		path.del('author[pet][0][age]');
		JSON.parse(path.read()).author.pet[0].should.not.have.property('age');
		done();
	});

	it('Should add a item', function (done) {
		path.add('repo', 'https://github.com/Tinple/easyjson');
		JSON.parse(path.read()).should.have.property('repo');
		path.add('author[pet][0][age]', 6);
		JSON.parse(path.read()).author.pet[0].should.have.property('age');
		done();
	});

	it('Should modify a item', function (done) {
		path.modify('project', 'EasyJSON');
		JSON.parse(path.read()).project.should.equal('EasyJSON');
		path.modify('author[name]', 'tinple');
		JSON.parse(path.read()).author.name.should.equal('tinple');
		path.modify('project', 'easyjson');
		path.modify('author[name]', 'Tinple');
		done();
	});
})