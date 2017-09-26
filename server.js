const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
