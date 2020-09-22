$(document).ready(function() {
	$('#launch_submit').click(function() {
		var jsonBody = {
			'notepad': document.getElementById('item1').checked,
			'snipping': document.getElementById('item2').checked,
			'ie': document.getElementById('item3').checked,
			'paint': document.getElementById('item4').checked
		}

		$.post('http://localhost:7000/launch',jsonBody)
	});
});