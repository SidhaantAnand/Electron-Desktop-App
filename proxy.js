var express = require('express');
var router = express.Router();
const axios = require('axios')
const qs = require('querystring')
const jwt_decode = require('jwt-decode')
const fs = require('fs');
const launch = require('./launch')

router.post('/launch', function(req,res) {
  if(req.body['notepad'] == 'true') {
    launch("notepad.exe","")
  }

  if(req.body['snipping'] == 'true') {
    launch("SnippingTool.exe","")
  }

  if(req.body['ie'] == 'true') {
    launch("iexplore.exe","")
  }

  if(req.body['paint'] == 'true') {
    launch("mspaint.exe","")
  }

});

router.post('/login',function(req,res) {
    var username = req.body['username']
    var password = req.body['password']
    console.log(req.body)
    var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
       }
    }

    var requestBody = {
      'grant_type': 'password',
      'client_id': 'nodejs-microservice',
      'client_secret': '78b23b94-79af-476e-84de-13967970950b',
      'username': username,
      'password': password
    }

    const url = "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token"

    axios.post(url, qs.stringify(requestBody),config).then((result) => {
      if(result.status == 200) {
        var data = result.data
        var statusText = result.statusText
        var access_token = data.access_token
        var decoded = jwt_decode(access_token)
        var role = decoded.resource_access['nodejs-microservice']['roles'][0]
        req.session.role = role;
        res.status(200).send({
          'status': "OK",
          'role': role
        });
        return;
      }

      else {
        res.status(200).send({
          'status': "401:Unauthorized",
        });
        return;
      }
      
    }).catch((err)=> {
        console.log(err)
        res.status(401).send(err);
        return;
    });

});

router.get('/files/login/success',function(req,res) {
  axios.get('http://localhost:3099/html/success').then(function (html) {
    if(req.session.role == 'user') {
      axios.get('http://localhost:3099/js/success/user').then(function (js) {
        fs.writeFileSync("tmp.js", js.data); 
        res.status(200).send({
          'html':html.data,
          'js': js.data
        });
        return;
      });
    }
    else if(req.session.role == 'admin') {
      axios.get('http://localhost:3099/js/success/admin').then(function (js) {
        fs.writeFileSync("tmp.js", js.data); 
        res.status(200).send({
          'html':html.data,
          'js': js.data
        });
        return;
      });
    }
  });
});

module.exports = router;