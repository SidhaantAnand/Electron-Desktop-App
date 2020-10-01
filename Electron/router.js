var express = require('express');
var router = express.Router();
const axios = require('axios')
const qs = require('querystring')
const jwt_decode = require('jwt-decode')
const fs = require('fs');
require('dotenv').config()
const launch = require('./launch')
const constants = require('./constants.json')
const openwhisk_url = constants.hosts.openwhisk
const proxy_auth = constants.hosts.proxy + constants.routes.auth 
const proxy_files = constants.hosts.proxy + constants.routes.files
const proxy_config = {
  headers: {
    'Authorization': 'Basic ' + process.env.SECRET_TOKEN
  }
}

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
    var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
       }
    }

    var requestBody = {
      'grant_type': 'password',
      'client_id': process.env.KEYCLOAK_SERVICE,
      'client_secret': process.env.KEYCLOAK_TOKEN,
      'username': username,
      'password': password
    }

    axios.post(openwhisk_url, qs.stringify(requestBody),config).then((result) => {
      if(result.status == 200) {
        var data = result.data
        var statusText = result.statusText
        var access_token = data.access_token
        var decoded = jwt_decode(access_token)
        axios.post(proxy_auth,{ username: username},proxy_config).then(function(role){
            req.session.role = role.data;
            res.status(200).send({
              'status': "OK",
              'role': role.data
            });
            return;
          }).catch(function(error) {
              res.status(401).send({
              'status': "401:Role not foun",
              });
              return;
          });
      }

      else {
        res.status(401).send({
          'status': "401:Unauthorized",
        });
        return;
      }
      
    }).catch((err)=> {
        res.status(401).send(err);
        return;
    });

});

router.get('/files/login/success',function(req,res) {
  axios.post(proxy_files, {file:'html'},proxy_config).then(function (html) {
    if(req.session.role == 'user') {
      axios.post(proxy_files,{file:'js-user'},proxy_config).then(function (js) {
        fs.writeFileSync("tmp.js", js.data); 
        res.status(200).send({
          'html':html.data,
          'js': js.data
        });
        return;
      });
    }
    else if(req.session.role == 'admin') {
      axios.post(proxy_files,{file:'js-admin'},proxy_config).then(function (js) {
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