const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use('/',function(req,res,next) {
  const auth_header = req.headers.authorization
  if(auth_header) {
  	const key = auth_header.substring(auth_header.indexOf(' ')+1)
  	if(key == 'secret_key')
  		next();
  }
  return
  
});

app.use(bodyParser.json());
app.post('/auth', function(req,res) {
	axios.post('http://localhost:7002/', {
		username: req.body.username
	}).then(function(response){
		res.status(200).send(response.data);
		return;
	}).catch(function(error){
		res.status(400).send(error)
		return;
	});
});

app.post('/files',function(req,res){
	if(req.body.file == "html") {
		axios.get('http://localhost:7003/html/success').then(function(response){
			res.status(200).send(response.data);
			return;
		}).catch(function(error){
			res.status(400).send(error)
			return;
		});
	}

	else if(req.body.file == "js-user") {
		axios.get('http://localhost:7003/js/user').then(function(response){
			res.status(200).send(response.data);
			return;
		}).catch(function(error){
			res.status(400).send(error)
			return;
		});
	}

	else if(req.body.file == "js-admin") {
		axios.get('http://localhost:7003/js/admin').then(function(response){
			res.status(200).send(response.data);
			return;
		}).catch(function(error){
			res.status(400).send(error)
			return;
		});
	}

	else {
		res.status(400).send("Incorrect Body!")
		return;
	}
});

app.listen(7001)