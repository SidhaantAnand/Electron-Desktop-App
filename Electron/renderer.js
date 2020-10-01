// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

$(document).ready(function() {
	document.getElementById('login_submit').onclick = function(){
		var username = $('#username').val()
		var password = $('#password').val()
		
		var requestBody = {
		  'username': username,
		  'password': password
		}

		const url = "http://localhost:7000/login"

		$.post(url, requestBody,function(result, status){
   			var statuscode = result.status
   			var role = result.role
   			if(statuscode != "OK") {
   				alert("Unauthorized")
   				return;
   			}

   			if(status != 'success') {
   				alert(status)
   				return;
   			}

   			alert("Authorized with role: " + JSON.stringify(role))

   			$.get("http://localhost:7000/files/login/success",function(response, status){
   				if(status != 'success') {
   					alert(status)
   					return;
   				}
   				$('#main_body').empty()
	    		$('#main_body').append(response.html)
    			var script = document.createElement("script")
    			script.type = "text/javascript";
    			script.src = "./tmp.js"
				document.getElementsByTagName("body")[0].insertAdjacentElement('beforeend',script);
   			});
   		});
   	}
});
