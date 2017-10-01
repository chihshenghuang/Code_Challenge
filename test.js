// test for server

const exec = require('mz/child_process').exec
const request = require('supertest-as-promised')
const expect = require('chai').expect
const app = require('./server.js')
var agent

describe('build application', function() {
	it('build the static file',function () {
		this.timeout(0)
		return exec('yarn build')
	})	
})

describe('express server', function() {
	it('respond to / with the index.html', function() {
		return request(app)
			.get('/')
			.expect('Content-Type', /html/)
			.expect(200)
			.then(res => expect(res.text).to.contain('<div id="root"></div>'))
	}) 

	it('respond to favicon.icon request', function() {
		return request(app)	
			.get('/favicon.ico')
			.expect('Content-Type', 'image/x-icon')
			.expect(200)
	})
	
	it('respond to any route with the index.html', function() {
	return request(app)	
		.get('/foo/bar')
		.expect('Content-Type', 'text/html; charset=UTF-8')
		.expect(200)
		.then(res => expect(res.text).to.contain('<div id="root"></div>'))
	})
}) 

describe('express routes', function() {
	beforeEach(function() {
		agent = request.agent(app)
	}) 
	it('Should return the login page', function(done) {
		agent
			.get('/')
			.expect(200, done)
	})
	it('Should return the login page', function(done) {
		agent
			.get('/login')
			.expect(200, done)

	})
	it('Should return the content page', function(done) {
		agent
			.get('/content')
			.expect(200, done)

	})
	it('Should get the articles from server', function(done) {
		agent
			.get('/api/topics')
			.expect(200, done)
	})
	it('Should update the articles from server', function(done) {
		let votesArr = {array: [0]}
		let indexArr = [0]
		agent
			.put('/api/topics')
			.send({'articleVotesArray': {array: [0]}, 'indexArr': [0]})
			.expect(200, done)
	})
	it('Should post the article to server', function(done) {
		agent
			.post('/api/topics')
			.send({'topic': 'test', 'articleVotesArray': {array: [0] }, 'indexArr': [0]})
			.expect(200, done)
	})
	it('Should test the sign up function', function(done) {
		agent
			.post('/api/signup')
			.send({'username': 'test', 'password': 'test'})
			.expect(200, done)
	})
	it('Should test the log in function', function(done) {
		agent
			.post('/api/login')
			.send({'username': 'test', 'password': 'test'})
			.expect(200, done)
	})

})
