const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()


const content = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer pretium dui sit amet felis. Integer sit amet diam. Phasellus ultrices viverra velit. Nam mattis, arcu ut bibendum commodo, magna nisi tincidunt tortor, quis accumsan augue ipsum id lorem.Lo'
var topics = [
	{
		id: 1,
		content: content,
		votes: 1
	},
	{
		id: 2,
		content: content,
		votes: 2
	},
	{
		id: 3,
		content: content,
		votes: 3
	},
	{
		id: 4,
		content: content,
		votes: 4
	},
	{
		id: 5,
		content: content,
		votes: 5
	}
]

var allowCrossDomain = function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', '*')
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION')
  //res.header('Access-Control-Allow-Headers', 'Content-Type')
  next();
}

//app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'build')))

	
const verify = (token, user) => {
	jwt.verify(token, 'RS256', function(err, decoded) {
		if(err)	{
			console.log('no auth')
			return res.status(403).send({
				response: 'NO_AUTHENTICATION'	
			})	
		}	  
		else {
			console.log('sucess')
			//req.decoded = decoded
		}
	})
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/topics', function(req, res) {
	//verify(req.cookies.token, req.body.username)
	topics.sort((a, b) => {
		return b.votes - a.votes	
	})
	console.log(topics)
	res.json(topics)
})

app.put('/api/topics', function(req, res) {
	//verify(req.cookies.token, req.body.username)
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
	//verify(req.cookies.token, req.body.username)
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

function userDictionary() {
	let users = {}
	this.set = (key, value) => {
		users[key] = value
	}
	this.has = (key) => {
		return key in users
	}
	this.get = (key) => {
		return this.has(key) ? users[key] : undefined
	}  
	this.getAll = () => {
		return users
	}
}

const userDict = new userDictionary()

app.post('/api/signup', function(req, res) {
	let user = req.body.username
	let password = req.body.password
	let response
/*
	if (user.indexOf(' ') || password.indexOf(' ')) {
		response = 'WRONGFORMAT'
		res.json({response})
	}
*/
	if (userDict.has(user)) {
		response = 'USER_EXIST'
	}
	else {
		userDict.set(user, password)
		response = 'CREATE_USER'
	}
	console.log(userDict.getAll())
	res.json({response})
})

app.post('/api/login', function(req, res) {
	let user = req.body.username
	let pwd = req.body.password
	let response

	if(userDict.has(user)) {
		if(userDict.get(user) === pwd) {
			let token = jwt.sign({user: user}, 'RS256')
			response = 'SUCCESS'
			res.json({response, token})
			return 
		}
		else {
			response = 'WRONGPASSWORD'
		}
	}
	else {
		response = 'NO_USER'
	}
	res.json({response})	
})

const port = process.env.PORT || 8080
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
