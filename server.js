const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'build')))
const DATALENGTH = 20
const port = process.env.PORT || 8080
const content = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
				Integer pretium dui sit amet felis. Integer sit amet diam. 
				Phasellus ultrices viverra velit. Nam mattis, arcu ut bibendum 
				commodo, magna nisi tincidunt tortor, quis accumsan augue ipsum id lorem.Lo`

// temp DB for articles 
function topicsDictionary() {
    let users = {}
    this.set = (key, id, content, votes) => {
        users[key] = {'id': id, 'content': content, 'votes': votes}
    }
    this.has = (key) => {
        return key in users
    }
    this.get = (key) => {
        return this.has(key) ? users[key] : undefined
    }
	this.size = () => {
		return Object.keys(users).length	
	}
    this.getAll = () => {
        return users
    }
}

// temp DB for user data
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

const topicsDict = new topicsDictionary()
const userDict = new userDictionary()

// generate 20 mock data to temp DB at the beginning
for (let i = 0; i < DATALENGTH; i++) {
   topicsDict.set(i, i, `Topic ${i}: ` + content, i)
}

// sort the articles by votes and return the limited articles
const getLimitArticles = () => {
	let sort_topics = []
	let limit_topics = []
	for (let i = 0; i < topicsDict.size(); i++) {
		sort_topics.push(topicsDict.get(i))
	}
	sort_topics.sort((a, b) => {
        return b.votes - a.votes
    })
	for (let i = 0; i < DATALENGTH; i++) {
		limit_topics.push(sort_topics[i])	
	}
	return limit_topics
}

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/api/topics', function(req, res) {
    res.json(getLimitArticles())
})

app.put('/api/topics', function(req, res) {
	let votesArr = req.body.articleVotesArray.array
	let indexArr = req.body.indexArr
	for (let i = 0; i < indexArr.length; i++) {
		topicsDict.set(indexArr[i], indexArr[i], topicsDict.get(indexArr[i]).content, votesArr[i])	
	}
	res.json(getLimitArticles())
})

app.post('/api/topics', function(req, res) {
   	let votesArr = req.body.articleVotesArray.array
	let indexArr = req.body.indexArr
	for (let i = 0; i < indexArr.length; i++) {
		topicsDict.set(indexArr[i], indexArr[i], topicsDict.get(indexArr[i]).content, votesArr[i])	
	}
	topicsDict.set(topicsDict.size(), topicsDict.size(), req.body.topic, 0)
	res.json(getLimitArticles())
})

app.post('/api/signup', function(req, res) {
    let user = req.body.username
    let password = req.body.password
    let response
    if (userDict.has(user)) {
        response = 'The user exist!!'
    } else {
        userDict.set(user, password)
        response = 'Create successfully, please log in!!'
    }
    res.json({ response })
})

app.post('/api/login', function(req, res) {
    let user = req.body.username
    let pwd = req.body.password
    let response

    if (userDict.has(user)) {
        if (userDict.get(user) === pwd) {
            response = 'SUCCESS'
            res.json({ response })
            return
        } else {
            response = 'Password is wrong!!'
        }
    } else {
        response = 'Not found user!!'
    }
    res.json({ response })
})

app.get('*', function(req, res){
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))	
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

module.exports = app
