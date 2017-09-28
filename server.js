const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var topics = [
	{
		id: 1,
		content: 'topic1',
		votes: 1
	},
	{
		id: 2,
		content: 'topic2',
		votes: 2
	},
	{
		id: 3,
		content: 'topic3',
		votes: 3
	},
	{
		id: 4,
		content: 'topics4',
		votes: 4
	},
	{
		id: 5,
		content: 'topics5',
		votes: 5
	}
]



var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/topics', function(req, res) {
	topics.sort((a, b) => {
		return b.votes - a.votes	
	})
	console.log(topics)
	res.json(topics)
})

app.put('/api/topics', function(req, res) {
	var articleVotesAry = req.body.articleVotesArray.array
	topics.sort((a, b) => {
		return a.id - b.id
	})
	articleVotesAry.shift()
	for(let i=1; i < topics.length; i++ ) {
		topics[i].votes = articleVotesAry[i]	
	}
	topics.sort((a, b) => {
		return b.votes - a.votes	
	})
	console.log(topics)
	res.json(topics)
})


app.post('/api/topics', function(req, res) {
	var articleVotesAry = req.body.articleVotesArray.array
	topics.sort((a, b) => {
		return a.id - b.id
	})
	articleVotesAry.shift()
	for(let i=1; i < topics.length; i++ ) {
		topics[i].votes = articleVotesAry[i]	
	}
	topics.push({
		id: topics.length+1,
		content: req.body.topic,
		votes: 0
	})
	console.log(req.body.articleVotesArray)
	topics.sort((a, b) => {
		return b.votes - a.votes	
	})
	console.log(topics)
	res.json(topics)
})


app.post('/api/login', function (req, res) {
	const valid = true;
	res.json({valid})
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
