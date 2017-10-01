const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

const root = __dirname + '/build'
app.use(express.static(root))

const DATALENGTH = 20
const port = process.env.PORT || 8080
/*const content = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
				Integer pretium dui sit amet felis. Integer sit amet diam. 
				Phasellus ultrices viverra velit. Nam mattis, arcu ut bibendum 
				commodo, magna nisi tincidunt tortor, quis accumsan augue ipsum id lorem.Lo`
*/
var topics = [];
for (let i = 0; i < DATALENGTH; i++) {
    topics.push({
        id: i,
        content: i,
        votes: i
    })
}

topics.sort((a, b) => {
	return b.votes - a.votes	
})

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
for (let i = 0; i < DATALENGTH; i++) {
   topicsDict.set(i, i, i, i)
}
const updateVotes = (votesArr, indexArr) => {
    //topics.sort((a, b) => {
        //return a.id - b.id
    //})
    //votesAry.shift()
    console.log('befroeUpdate', topics)
	for (let i = 0; i < topics.length; i++) {
        topics[i].votes = votesArr[i]
    }
    console.log('update', topics)
}

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/api/topics', function(req, res) {
	let sort_topics = []
	for (let i = 0; i < topicsDict.size(); i++) {
		sort_topics.push(topicsDict.get(i))
	}
	sort_topics.sort((a, b) => {
        return b.votes - a.votes
    })
	let limit = []
	for (let i = 0; i < 20; i++) {
		limit.push(sort_topics[i])	
	}
    console.log('get sort', sort_topics)
    console.log('get limit', limit)
    //res.json(sort_topics)
    res.json(limit)
})

app.put('/api/topics', function(req, res) {
	let votesArr = req.body.articleVotesArray.array
	let indexArr = req.body.indexArr
    console.log('votes', req.body.articleVotesArray.array)
    console.log('index', indexArr)
	//updateVotes(votesArr, indexArr)
    
	let sort_topics = []
	for (let i = 0; i < indexArr.length; i++) {
		topicsDict.set(indexArr[i], indexArr[i], topicsDict.get(indexArr[i]).content, votesArr[i])	
	}
	for (let i = 0; i < topicsDict.size(); i++) {
		sort_topics.push(topicsDict.get(i))
	}
	console.log('put', sort_topics)
	sort_topics.sort((a, b) => {
        return b.votes - a.votes
    })
    console.log('filter', sort_topics)
    let limit = []
	for (let i = 0; i < 20; i++) {
		limit.push(sort_topics[i])	
	}
	//res.json(sort_topics)
	console.log('limit', limit)
	res.json(limit)
})

app.post('/api/topics', function(req, res) {
    //console.log('post', topics)
    //updateVotes(req.body.articleVotesArray.array)
    //topics.push({
        //id: topics.length + 1,
        //content: req.body.topic,
        //votes: 0
    //})
	let votesArr = req.body.articleVotesArray.array
	let indexArr = req.body.indexArr
    console.log('votes', req.body.articleVotesArray.array)
    console.log('index', indexArr)
	//updateVotes(votesArr, indexArr)
    
	let sort_topics = []
	for (let i = 0; i < indexArr.length; i++) {
		topicsDict.set(indexArr[i], indexArr[i], topicsDict.get(indexArr[i]).content, votesArr[i])	
	}
	topicsDict.set(topicsDict.size(), topicsDict.size(), req.body.topic, 0)
	for (let i = 0; i < topicsDict.size(); i++) {
		sort_topics.push(topicsDict.get(i))
	}
	
	console.log('post', sort_topics)
    sort_topics.sort((a, b) => {
        return b.votes - a.votes
    })
	let limit = []
	for (let i = 0; i < 20; i++) {
		limit.push(sort_topics[i])	
	}
	console.log('post filter', sort_topics)
	console.log('limit', limit)
    //res.json(sort_topics)
	res.json(limit)
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
            res.json({ response, token })
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
