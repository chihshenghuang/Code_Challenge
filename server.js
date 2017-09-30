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
const content = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
				Integer pretium dui sit amet felis. Integer sit amet diam. 
				Phasellus ultrices viverra velit. Nam mattis, arcu ut bibendum 
				commodo, magna nisi tincidunt tortor, quis accumsan augue ipsum id lorem.Lo`

var topics = [];
for (let i = 1; i <= DATALENGTH; i++) {
    topics.push({
        id: i,
        content: content,
        votes: i
    })
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

const userDict = new userDictionary()
const updateVotes = (votesAry) => {
    topics.sort((a, b) => {
        return a.id - b.id
    })
    votesAry.shift()
    for (let i = 0; i < topics.length; i++) {
        topics[i].votes = votesAry[i]
    }
}

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/api/topics', function(req, res) {
    console.log('get', topics)
	topics.sort((a, b) => {
        return b.votes - a.votes
    })
    res.json(topics)
})

app.put('/api/topics', function(req, res) {
    console.log(req.body.articleVotesArray.array)
    updateVotes(req.body.articleVotesArray.array)
    topics.sort((a, b) => {
        return b.votes - a.votes
    })
    res.json(topics)
})

app.post('/api/topics', function(req, res) {
    updateVotes(req.body.articleVotesArray.array)
    topics.push({
        id: topics.length + 1,
        content: req.body.topic,
        votes: 0
    })
    topics.sort((a, b) => {
        return b.votes - a.votes
    })
    res.json(topics)
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
            let token = jwt.sign({ user: user }, 'RS256')
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
