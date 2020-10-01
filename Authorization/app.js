const auth = JSON.parse(JSON.stringify(require('./roles.json')))
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.post('/', function(req,res) {
	res.send(auth[req.body.username])
	return;
});

app.listen(7002)