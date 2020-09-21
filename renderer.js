// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var $ = require( "jquery" );
var qs = require('querystring')
var jwt_decode = require('jwt-decode')

const { exec } = require("child_process");
var axios = require('axios')
const fs = require('fs'); 

$(document).ready(function() {
	document.getElementById('login_submit').onclick = function(){
		var username = $('#username').val()
		var password = $('#password').val()
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

		axios.post(url, qs.stringify(requestBody), config).then((result) => {
   			var statuscode = result.status
   			if(statuscode != 200) {
   				alert(statuscode + ":" + statusText)
   				return;
   			}

   			var data = result.data
   			var statusText = result.statusText
   			var access_token = data.access_token
   			var decoded = jwt_decode(access_token)
   			var role = decoded.resource_access['nodejs-microservice']['roles'][0]
   			alert("Authorized with role: " + JSON.stringify(role))

   			if(role == 'admin') {
   				axios.get('http://localhost:3099/html/success').then(function (response) {
	    			$('#main_body').empty()
	    			$('#main_body').append(response.data)
	    			axios.get('http://localhost:3099/js/success/admin').then(function (response) {
		    			fs.writeFileSync("tmp.js", response.data); 
		    			var script = document.createElement("script")
		    			script.type = "text/javascript";
		    			script.src = "./tmp.js"
	    				document.getElementsByTagName("body")[0].insertAdjacentElement('beforeend',script);
	    			}).catch(function(err) {
	    				alert(err);
	    			});
		    	}).catch(function(err) {
		    		alert(err);
		    	});
   			}

   			else {
   				axios.get('http://localhost:3099/html/success').then(function (response) {
	    			$('#main_body').empty()
	    			$('#main_body').append(response.data)
	    			axios.get('http://localhost:3099/js/success/user').then(function (response) {
		    			fs.writeFileSync("tmp.js", response.data); 
		    			var script = document.createElement("script")
		    			script.type = "text/javascript";
		    			script.src = "./tmp.js"
	    				document.getElementsByTagName("body")[0].insertAdjacentElement('beforeend',script);
	    			}).catch(function(err) {
	    				alert(err);
	    			});
		    	}).catch(function(err) {
		    		alert(err);
		    	});
   			}
			
		}).catch(function(err) {
			alert(err)
		});
	}
});

